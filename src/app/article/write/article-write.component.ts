import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ArticleService} from "../article.service";
import {Article} from "../../model/article";
import {ActivatedRoute, Router} from "@angular/router";
import {UploadComponent} from "../../upload/upload.component";
import {SlimLoadingBarService} from "../../loading/slim-loading-bar.service";

const MORE_TAG = '<!--more-->';

enum Action {
    create, // 新文章
    modify  // 修改文章
}

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-write.component.html',
    styleUrls: ['./article-write.component.css']
})
export class ArticleWriteComponent implements OnInit, AfterViewInit {

    @ViewChild('markdownEditor') simpleMDE: ElementRef;
    @ViewChild('bannerForm') bannerForm: UploadComponent;

    action: Action = Action.create;

    markdownEditor: any; // md 编辑器

    article = new Article(); // 文章

    powers = ['App', 'Web', 'Server', 'Elastic'];

    constructor(private articleService: ArticleService,
                private router: Router,
                private activeRoute: ActivatedRoute,
                private slimLoadingService: SlimLoadingBarService) {
        this.article.title = '暗影诗章';
        this.article.tags = ['Shadowverse', 'RPG'];
        this.article.category = this.powers[0];
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

        // 初始化 markdown 编辑器
        this.markdownEditor = new SimpleMDE({
            element: this.simpleMDE.nativeElement,
            // showIcons: ["code", "table"]
        });

        // 编辑器监听
        this.markdownEditor.codemirror.on('change', () => {
            this.article.content = this.markdownEditor.value();
        });

        // 初始化时间选择器
        flatpickr(".flatpickr", {enableTime: true});

        // check create or modify
        this.activeRoute.url.subscribe(urlSegments => {
            this.action = urlSegments[1].path == 'create' ? Action.create : Action.modify;
            if (this.action == Action.modify) {
                this.activeRoute.params.subscribe(params => {
                    this.getArticleById(params.id);
                });
            }
        });
    }

    getArticleById(id) {
        this.articleService.getArticleDetail(id).subscribe(result => {
            if (result.success) {
                this.article = result.data ? result.data : new Article();
                this.markdownEditor.value(this.article.content);
                setTimeout(() => {
                    this.slimLoadingService.complete();
                }, 1500);
            }
        });
    }

    onPublishClick() {
        if (this.bannerForm) {
            this.bannerForm.doUpload(null);
            return;
        }
        let available = this.article.content
            && this.article.title
            && this.article.category
            && this.article.tags
            && this.article.tags.length > 0;
        if (available) {
            const index = this.article.content.indexOf(MORE_TAG);
            if (index > 0) {
                this.article.summary = this.article.content.substring(0, index);
            }
            this.articleService
                .createArticle(this.article)
                .subscribe(result => {
                    if (result.success) {
                        this.router.navigateByUrl(`/article/${result.data._id}`)
                    } else {
                        console.warn(result);
                    }
                });
        }
    }

    onSelectFile(file: File) {
        console.warn('Onselec', file)
    }

}
