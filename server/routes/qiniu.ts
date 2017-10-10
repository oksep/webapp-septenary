import {Router} from "express";
import * as QiniuController from "../controller/qiniu";
import * as Auth from "../auth/auth";

const qiniuRouter: Router = Router();

qiniuRouter.post("/uptoken", Auth.authenticateJWT(), QiniuController.getUptoken);

export {qiniuRouter};