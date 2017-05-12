import {Router} from "express";
import * as Auth from "../auth/auth";
import * as ArticleController from "../controller/articles";

const articleRouter: Router = Router();

articleRouter.post('/create', Auth.authenticateJWT(), ArticleController.createArticle);

articleRouter.post('/update', Auth.authenticateJWT(), ArticleController.updateArticle);

articleRouter.get('/page/:page', ArticleController.listArticle);

articleRouter.get('/detail/:id', ArticleController.getArticleDetail);

export {articleRouter};