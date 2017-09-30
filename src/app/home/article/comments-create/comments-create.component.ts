import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArticleService} from "../article.service";
import {Comment} from "../../../model/comment";
import {NotificationsService} from "../../../notification/simple-notifications/services/notifications.service";
import {Article} from "../../../model/article";

@Component({
	selector: 'app-comments-create',
	templateUrl: './comments-create.component.html',
	styleUrls: ['./comments-create.component.scss']
})
export class CommentsCreateComponent implements OnInit {

	isSubmitting = false;

	comment: Comment = new Comment();

	rememberComment: boolean = false;

	showForm = false;

	@Input() article: Article;
	@Output() onRequestAppendComment = new EventEmitter<Comment>();

	constructor(private articleService: ArticleService, private notifyService: NotificationsService) {

	}

	ngOnInit() {
		let comment = this.articleService.getLastComment();
		if (comment) {
			this.comment.name = comment.name;
			this.comment.email = comment.email;
			this.comment.website = comment.website;
			this.rememberComment = true;
		}
	}

	onSubmitComment(comment: Comment) {
		if (!this.validateEmail(comment.email)) {
			this.notifyService.warn('提示', '请填写正确的邮箱地址');
			return;
		}
		if (!this.isSubmitting) {
			this.isSubmitting = true;
			comment.article = this.article._id;
			this.articleService.createComment(comment).subscribe(result => {
				this.isSubmitting = false;
				if (result.success) {
					this.showForm = false;
					this.notifyService.success('提示', '提交成功');
					this.onRequestAppendComment.next(result.data as Comment);
				} else {
					this.notifyService.warn('提示', '请检查提交内容');
				}
			});

			this.comment = this.rememberComment ? comment : new Comment();
			this.comment.content = null;
			this.articleService.setLastComment(this.rememberComment ? comment : null);
		}
	}

	rememberMe(remember: boolean) {
		this.rememberComment = remember;
	}

	validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
}
