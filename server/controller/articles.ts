import Article from "../model/article";
import {Request, Response} from "../middleware/result";

const MORE_TAG = '<!--more-->';

// 设置文章 time 、summary
function resolveArticle(article: any) {
	article.updatedTime && (article.updatedTime = new Date(article.updatedTime));
	article.createdTime && (article.createdTime = new Date(article.createdTime));

	const imgUrls = article.content.match(/!\[.*?\]\((.*?)\)/);
	if (imgUrls && imgUrls.length > 1) {
		article.summaryImages = [imgUrls[1]];
	} else {
		article.summaryImages = null;
	}

	const index = article.content.indexOf(MORE_TAG);
	if (index > 0) {
		let summary = article.content.substring(0, index);
		if (article.summaryImages) {
			article.summary = summary.replace(article.summaryImages[0], '')
		}
	}
}

// 创建文章
export function createArticle(request: Request, response: Response) {
	const body = request.body;
	body.author = request.user._id; // //toObjectId(request.user._id);
	resolveArticle(body);
	let article = new Article(body);
	article.save().then(doc => {
		response.success(doc);
	}).catch(err => {
		response.failed(err.message);
	});

}

// 查找文章
export function findArticle(request: Request, response: Response) {
	// var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
	Article.findById(request.params._id)
		.populate('author', '_id name avatar')
		.then(doc => {
			if (doc) {
				response.success(doc)
			} else {
				response.status(404);
				response.failed('未找到此文章');
			}
		})
		.catch(err => {
			response.status(500);
			response.failed(err.message);
		});
}

// 修改文章
export function updateArticle(request: Request, response: Response) {
	let body = request.body;
	resolveArticle(body);
	Article
		.findByIdAndUpdate(body._id, body, {
			"new": true
		})
		.then((result) => {
			response.success(result);
		})
		.catch((error: Error) => {
			response.status(404);
			response.failed(error);
		})
}

// 按页查询
export function paginateArticle(request: Request, response: Response) {
	const LIMIT = 10;
	let query = null;
	let page = request.params.page;

	let tag = request.params.tag;
	if (tag) {
		query = {tags: tag};
	}

	let category = request.params.category;
	if (category) {
		query = {category: category};
	}

	let columnist = request.params.columnist;
	if (columnist) {
		query = {author: columnist};
	}

	let offset = LIMIT * page - LIMIT;
	let sort = {createdTime: 'desc'}; // 按时间倒排
	Article
		.paginate(
			query,
			{
				offset: offset,
				limit: LIMIT,
				sort: sort,
				populate: [
					{path: 'author', select: "_id name avatar"}
				]
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

// 标签聚合
export function aggregateTags(request: Request, response: Response) {
	Article
		.aggregate(
			{
				$unwind: "$tags"
			},
			{
				$group: {
					_id: "$tags",
					count: {$sum: 1}
				}
			}
		)
		.then(doc => {
			response.success(doc);
		})
		.catch(err => {
			response.failed(err.message);
		})
}

// 删除文章
export function deleteArticle(request: Request, response: Response) {
	Article.findById(request.body.id)
		.populate('author', '_id')
		.then(doc => {
			if (doc) {
				if ((<any>doc.author)._id == request.user._id || request.user.role == 'admin') {
					Article.findByIdAndRemove(request.body.id)
						.then((doc) => {
							response.success(doc);
						})
						.catch(err => {
							response.status(500);
							response.failed(err.message);
						});
				} else {
					response.status(403);
					response.failed('没有权限执行此操作');
				}
			} else {
				response.status(404);
				response.failed('未找到此文章');
			}
		})
		.catch(err => {
			response.status(500);
			response.failed(err.message);
		});
}