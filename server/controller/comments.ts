import Comment, {IComment} from "../model/comment";
import {Request, Response} from "../middleware/result";
import {mailer} from "../email/mailer";
import Article from "../model/article";
import {IUser} from "../model/user";

// 创建评论
export function createComment(request: Request, response: Response) {
	const comment = request.body as IComment;
	new Comment(comment).save()
		.then(doc => {
			response.success(doc);
			sendEmail(doc);
		})
		.catch(err => {
			response.failed(err.message);
		});
}

function sendEmail(comment: IComment) {
	Article.findById(comment.article)
		.populate('author', '_id name email')
		.then(doc => {
			let author: IUser = <any>doc.author as IUser;
			const mailOptions = {
				to: author.email,
				subject: `Hi~ ${author.name}，您的文章 "${doc.title}" 有了新的评论!`,
				text: '',
				html: `
					<p><span style="font-weight: 900">${comment.name}</span>&nbsp;说:</p>
					<p style="color: #555; margin-top: 12px">${comment.content}</p>
					<br>
					<a href="http://www.septenary.cn/article/${doc._id}">文章链接：http://www.septenary.cn/article/${doc._id}</a>
				`
			};

			mailer.sendAdminEmail(mailOptions);
		});
}

// 按页查询评论
export function paginateComments(request: Request, response: Response) {
	const LIMIT = 100;
	let page = request.params.page;
	let offset = LIMIT * page - LIMIT;
	let sort = {createdTime: 'desc'}; // 按时间倒排
	Comment
		.paginate(
			{article: request.params.article},
			{
				offset: offset,
				limit: LIMIT,
				sort: sort
			}
		)
		.then(result => {
			response.success(result);
		})
		.catch(err => {
			response.status(404);
			response.failed(err.message);
		});
}

// 删除评论
export function deleteComment(request: Request, response: Response) {
	Comment.findByIdAndRemove(request.body.id)
		.then((doc) => {
			response.success(doc);
		})
		.catch(err => {
			response.status(404);
			response.failed(err.message);
		});
}