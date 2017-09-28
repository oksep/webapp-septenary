import Comment from "../model/comment";
import {Request, Response} from "../middleware/result";

// 创建评论
export function createComment(request: Request, response: Response) {
	const body = request.body;
	new Comment(body).save().then(doc => {
		response.success(doc);
	}).catch(err => {
		response.failed(err.message);
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