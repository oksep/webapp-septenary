import {Router} from "express";
import * as QiniuController from "../controller/qiniu";

const qiniuRouter: Router = Router();

// qiniuRouter.get("/uptoken", Auth.authenticateJWT(), Auth.authenticateAdmin(), QiniuController.getUptoken);

qiniuRouter.post("/uptoken", QiniuController.getUptoken);

export {qiniuRouter};