import {Router} from "express";
import * as Auth from "../auth/auth";
import * as ArticleController from "../controller/articles";

const articleRouter: Router = Router();

articleRouter.post('/create', Auth.authenticateJWT(), ArticleController.createArticle);

articleRouter.post('/update', Auth.authenticateJWT(), ArticleController.updateArticle);

articleRouter.get('/page/:page', ArticleController.paginateArticle);

articleRouter.get('/detail/:_id', ArticleController.findArticle);

articleRouter.get('/tags', ArticleController.aggregateTags);

export {articleRouter};