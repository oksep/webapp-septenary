import {Request, Response, Router} from "express";
import * as JWT from "jwt-simple";
import * as moment from "moment";

import Config from "../auth/config";

import User from "../model/user";

import Result from "./result";

const authRouter: Router = Router();

authRouter.post('/login', (request: Request, response: Response) => {
    console.log(JSON.stringify(request.body));
    let email = request.body.email;
    let password = request.body.password;
    let user = User.find(email, password);

    if (user) {
        const payload = {
            id: user.id,
            role: user.role,
            iat: moment().unix(),
            exp: moment().add(30, 'minute').unix()
            // iss: jwt签发者
            // sub: jwt所面向的用户
            // aud: 接收jwt的一方
            // exp: jwt的过期时间，这个过期时间必须要大于签发时间
            // nbf: 定义在什么时间之前，该jwt都是不可用的.
            // iat: jwt的签发时间
            // jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
        };
        response.json(Result.success({
            token: JWT.encode(payload, Config.JWTSecret) // jwt 签发
        }));
    } else {
        response.status(401);
        response.json(Result.failed({
            message: '帐号或密码错误'
        }));
    }
});

authRouter.post('/register', (request: Request, response: Response) => {
    let email = request.body.email;
    let password = request.body.password;
    let exist = User.exist(email);
    if (exist) {
        response.json(Result.failed({
            message: '帐号已存在'
        }));
    } else {
        User.add(email, password);
        response.json(Result.success({
            message: '注册成功'
        }));
    }
});

export {
    authRouter
};