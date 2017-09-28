import {Router} from "express";
import * as CommentController from "../controller/comments";
import * as Auth from "../auth/auth";

const commentRouter: Router = Router();

commentRouter.post('/create', CommentController.createComment);

commentRouter.get('/:article/:page', CommentController.paginateComments);

commentRouter.post('/delete', Auth.authenticateJWT(), CommentController.deleteComment);

export {commentRouter};