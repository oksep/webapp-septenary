import {Request, Response, Router} from "express";
import * as Auth from "../auth/auth";
import Result from "./result";
import {Post} from "../model/post";

const postRouter: Router = Router();

postRouter.post('/create', Auth.authenticateJWT(), (request: Request, response: Response) => {

    console.log('创建文章', request.body);
    Post.addPost();
    response.json(Result.success({
        data: '文章发布成功'
    }));

});

postRouter.get('/page/:page', (request: Request, response: Response) => {
    let page = request.params.page;
    let result = Post.getPostByPage(page);
    response.json(Result.success(result));
});


export {postRouter};