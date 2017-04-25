import {Router, Response, Request} from 'express';
import * as JWT from 'jwt-simple';
import * as moment from 'moment';

import Config from '../auth/config';

import User from '../model/user';

const authRouter: Router = Router();

authRouter.post('/login', (request: Request, response: Response) => {
    console.log(request.body);
    let email = request.body.email;
    let password = request.body.password;
    let user = User.find(email, password);

    if (user) {
        const payload = {
            id: user.id,
            iat: moment().unix(),
            exp: moment().add(5, 'minute').unix()
        };
        response.json({
            success: true,
            token: JWT.encode(payload, Config.JWTSecret)
        });
    } else {
        response.status(401);
        response.json({
            error: {},
            message: '帐号或密码错误'
        });
    }
});

export {
    authRouter
};