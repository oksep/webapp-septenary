import {Request, Response, Router} from "express";
import * as Auth from "../auth/auth";
import Result from "./result";

import User from "../model/user";

const userRouter: Router = Router();

userRouter.get(
    "/list",
    Auth.authenticateJWT(),
    Auth.authenticateAdmin(),
    (request: Request, response: Response) => {
        response.json(Result.success({
            list: User.listAllUsers()
        }));
    }
);

userRouter.get(
    "/me",
    Auth.authenticateJWT(),
    (request: Request, response: Response) => {
        response.json(Result.success({
            me: request.user
        }));
    }
);

userRouter.post('/login', (request: Request, response: Response) => {
    response.redirect('/api/auth/login');
});

export {userRouter};