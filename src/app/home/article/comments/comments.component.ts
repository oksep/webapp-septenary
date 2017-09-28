import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../article.service";
import {Article} from "../../../model/article";
import {Result} from "../../../util/base.server";
import {Comment} from "../../../model/comment";
import {AuthEvent, AuthService} from "../../../auth/auth.service";
import {User} from "../../../model/user";
import {NotificationsService} from "../../../notification/simple-notifications/services/notifications.service";

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

	@Input() article: Article;

	comments: Comment[];

	loginUser: User;

	constructor(private articleService: ArticleService,
							private authService: AuthService,
							private notifyService: NotificationsService) {
	}

	ngOnInit() {
		if (this.article) {
			this.articleService.listComments(this.article._id, 1)
				.subscribe((result: Result<{ offset: number, total: number, limit: number, docs: Comment[] }>) => {
					this.comments = result.data.docs;
				});
		}

		this.authService.events.subscribe((event: AuthEvent) => {
			if (event) {
				this.loginUser = event.loginUser;
			} else {
				this.loginUser = null;
			}
		});
	}

	deleteCommentClick(comment: Comment) {
		if (window.confirm("确定删除吗？")) {
			this.articleService.deleteComment(comment).subscribe(result => {
				if (result.success) {
					this.comments = this.comments.filter(cmt => cmt._id != comment._id);
				} else {
					this.notifyService.error("提示", "删除失败");
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

	appendComment(comment: Comment) {
		this.comments.unshift(comment);
	}
}
