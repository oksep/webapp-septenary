import {Request, Response} from "../middleware/result";
import User from "../model/user";
import Article from "../model/article";

// 统计概要
export function overview(request: Request, response: Response) {
	Promise.all([
		User.count({}),
		Article.count({}),
	]).then((result: number[]) => {
		response.success({
			users: result[0],
			articles: result[1],
			visits: 10272
		});
	}).catch(err => {
		response.failed(err.message);
	});

}