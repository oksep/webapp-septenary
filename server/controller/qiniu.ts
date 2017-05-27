import {NextFunction, Request, Response} from "express";
import Result from "./result";
import {QiniuConfig} from "../config";
const Qiniu = require('qiniu');

Qiniu.conf.ACCESS_KEY = QiniuConfig.ACCESS_KEY;
Qiniu.conf.SECRET_KEY = QiniuConfig.SECRET_KEY;

const Uptoken = new Qiniu.rs.PutPolicy(QiniuConfig.BUCKET_NAME);

// 上传文件 token
export function getUptoken(request: Request, response: Response, next: NextFunction) {
    const token = Uptoken.token();
    response.header("Cache-Control", "max-age=0, private, must-revalidate");
    response.header("Pragma", "no-cache");
    response.header("Expires", '0');
    response.json(Result.success({
        uptoken: token
    }));
}