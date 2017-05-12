import Article from "../model/article";
import {Request, Response} from "express";
import Result from "./result";

export function createArticle(request: Request, response: Response) {
    const body = request.body;

    body.updatedTime && (body.updatedTime = new Date(body.updatedTime));
    body.createdTime && (body.createdTime = new Date(body.createdTime));
    body.authorID = request.user.uid;

    let article = new Article(body);

    article.save().then(doc => {
        response.json(Result.success(doc));
    }).catch(err => {
        console.log(err);
        response.json(Result.failed(err.message));
    });

}

export function getArticleDetail(request: Request, response: Response) {
    let id = request.params.id;
    Article.findOne({articleID: id}).then(doc => {
        response.json(Result.success(doc));
    }).catch(err => {
        response.status(404);
        response.json(Result.failed(err.message));
    });
}

export function updateArticle(request: Request, response: Response) {
    response.send('TODO');
}

export function listArticle(request: Request, response: Response) {
    let page = request.params.page;
    let result = Article.find();
    // response.json(Result.success(result));
    response.send('TODO');
}