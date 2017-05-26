import {Router} from "express";
import * as Auth from "../auth/auth";
import * as QiniuController from "../controller/qiniu";

const qiniuRouter: Router = Router();

qiniuRouter.get("/uptoken", Auth.authenticateJWT(), Auth.authenticateAdmin(), QiniuController.getUptoken);

export {qiniuRouter};