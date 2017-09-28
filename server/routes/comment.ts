import {Router} from "express";
import * as CommentController from "../controller/comments";

const commentRouter: Router = Router();

commentRouter.post('/create', CommentController.createComment);

commentRouter.get('/:article/:page', CommentController.paginateComments);

commentRouter.post('/delete', CommentController.deleteComment);

export {commentRouter};