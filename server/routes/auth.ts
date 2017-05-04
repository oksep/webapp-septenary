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
            admin: user.role == 'admin',
            iat: moment().unix(),
            exp: moment().add(30, 'minute').unix()
        };
        response.json(Result.success({
            token: JWT.encode(payload, Config.JWTSecret)
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