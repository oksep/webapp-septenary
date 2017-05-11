import ArticleModel from "../model/article";
import Article from "../model/article";
import {Request, Response} from "express";
import Result from "./result";

export function createArticle(request: Request, response: Response) {
    const body = request.body;

    body.updatedTime && (body.updatedTime = new Date(body.updatedTime));
    body.createdTime && (body.createdTime = new Date(body.createdTime));

    console.log('AAA', request.user);

    let article = new ArticleModel(body);

    article.save().then(doc => {
        response.json(Result.success({
            message: '创建成功',
            doc: doc
        }));
    }).catch(err => {
        console.log(err);
        response.json(Result.failed({message: err.message}));
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