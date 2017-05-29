import {NextFunction, Request, Response} from "express";
import Result from "./result";
import {QiniuConfig} from "../config";
const Qiniu = require('qiniu');

Qiniu.conf.ACCESS_KEY = QiniuConfig.ACCESS_KEY;
Qiniu.conf.SECRET_KEY = QiniuConfig.SECRET_KEY;

// 上传文件 token
export function getUptoken(request: Request, response: Response, next: NextFunction) {
    const scope = request.body.key ? QiniuConfig.BUCKET_NAME + ":" + request.body.key : QiniuConfig.BUCKET_NAME;
    const Uptoken = new Qiniu.rs.PutPolicy(scope);
    response.header("Cache-Control", "max-age=0, private, must-revalidate");
    response.header("Pragma", "no-cache");
    response.header("Expires", '0');
    response.json(Result.success({
        uptoken: Uptoken.token()
    }));
}