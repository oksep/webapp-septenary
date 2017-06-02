import {NextFunction} from "express";
import {QiniuConfig} from "../config";
import {Request, Response} from "../middleware/result";
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
    response.success({
        uptoken: Uptoken.token()
    });
}