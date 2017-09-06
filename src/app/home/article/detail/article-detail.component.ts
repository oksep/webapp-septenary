import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../article.service";
import {Article} from "../../../model/article";
import {Toc, TocEvent} from "../../../markdown/markdown.component";
import {SlimLoadingBarService} from "../../../loading/slim-loading-bar.service";
import Gitment from 'gitment'
import {AuthEvent, AuthService} from "../../../auth/auth.service";
import {User} from "../../../model/user";
import {NotificationsService} from "../../../notification/simple-notifications/services/notifications.service";
import {Result} from "../../../util/base.server";

@Component({
	selector: 'app-article-detail',
	templateUrl: './article-detail.component.html',
	styleUrls: [
		'./article-detail.component.scss',
		'./prism_themes/prism-cb.css',
	],
	encapsulation: ViewEncapsulation.None // 很重要，使对 marked 渲染的 innerHtml 的 css 生效
})
export class ArticleDetailComponent implements OnInit, OnDestroy, AfterViewInit {

	article: Article;
	toc: Toc[];

	constructor(private articleService: ArticleService,
							private router: Router,
							private authService: AuthService,
							private activeRoute: ActivatedRoute,
							private notifyService: NotificationsService,
							private slimLoadingService: SlimLoadingBarService) {
	}

	loginUser: User;

	ngOnInit() {
		this.slimLoadingService.start();
		this.slimLoadingService.progress = 25;
		this.activeRoute.params.subscribe(params => {
			let id = params.id;
			this.articleService.getArticleDetail(id).subscribe((result: Result<Article>) => {
				if (result.success) {
					this.article = result.data as Article;
					this.slimLoadingService.complete();
					this.renderComments();
				} else {
					this.slimLoadingService.reset();
					this.notifyService.warn('提示', result.error.message);
				}
			});
		});

		this.authService.events.subscribe((event: AuthEvent) => {
			if (event) {
				this.loginUser = event.loginUser;
			} else {
				this.loginUser = null;
			}
		});
	}

	ngOnDestroy() {
	}

	onTocUpdate(tocEvent: TocEvent) {
		if (tocEvent.tocFrom == 'content-data') {
			setTimeout(() => {
				this.toc = tocEvent.toc;
			}, 0);
		}
	}

	ngAfterViewInit(): void {
		if (this.article) {
			this.renderComments();
		}
	}

	hasRenderComments = false;

	renderComments() {
		if (!this.hasRenderComments && this.article) {
			new Gitment({
				id: 'testing/' + this.article._id, // 可选。默认为 location.href
				owner: 'ryfthink',
				repo: 'webapp-septenary-comments',
				oauth: {
					client_id: '7886f1e96375b3549b03',
					client_secret: '2542059d79beb3ce4bee03c43736718edcba5edf',
				},
			}).render('gitment');
			this.hasRenderComments = true;
		}
	}

	// 删除文章
	deleteArticleClick() {
		if (window.confirm('文章删除后将无法恢复,确定要删除吗')) {
			this.articleService.deleteArticle(this.article).subscribe((result: Result<any>) => {
				if (result.success) {
					this.router.navigateByUrl('/');
					this.notifyService.info('提示', '文章已被删除!');
				} else {
					this.notifyService.warn('提示', result.error.message);
				}
			});
		}
	}

	// 本文作者 或 管理员 才有权限编辑文章
	hasEditPermission() {
		if (this.loginUser) {
			return (this.article.author._id == this.loginUser._id) || this.loginUser.role == 'admin';
		} else {
			return false
		}
	}
}
