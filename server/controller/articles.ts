import Article from "../model/article";
import {Request, Response} from "express";
import Result from "./result";
import {toObjectId} from "../model/util";


const MORE_TAG = '<!--more-->';

export function createArticle(request: Request, response: Response) {
    const body = request.body;

    body.updatedTime && (body.updatedTime = new Date(body.updatedTime));
    body.createdTime && (body.createdTime = new Date(body.createdTime));
    body.authorID = request.user.uid;
    body.author = toObjectId(request.user._id);

    let article = new Article(body);
    const index = article.content.indexOf(MORE_TAG);
    if (index > 0) {
        article.summary = article.content.substring(0, index);
    }

    article.save().then(doc => {
        response.json(Result.success(doc));
    }).catch(err => {
        console.log(err);
        response.json(Result.failed(err.message));
    });

}

export function findArticle(request: Request, response: Response) {
    // var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    let id = request.params.id;
    Article.findOne({articleID: id})
        .populate('author', 'uid name avatar')
        .then(doc => {
            response.json(Result.success(doc));
        })
        .catch(err => {
            response.status(404);
            response.json(Result.failed(err.message));
        });
}

export function updateArticle(request: Request, response: Response) {
    response.send('TODO');
}

// 按页查询
export function paginateArticle(request: Request, response: Response) {
    const LIMIT = 8;
    let page = request.params.page;
    let offset = LIMIT * page - LIMIT;
    let sort = {createdTime: 'desc'}; // 按时间倒排
    Article
        .paginate({}, {
            offset: offset,
            limit: LIMIT,
            sort: sort,
            populate: [
                {path: 'author', select: "uid name avatar"}
            ]
        })
        .then(result => {
            response.json(Result.success(result));
        })
        .catch(err => {
            response.status(404);
            response.json(Result.failed(err.message));
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
            response.json(Result.success(doc));
        })
        .catch(err => {
            response.json(Result.failed(err.message));
        })
}