import {Router} from "express";

import * as UserController from "../controller/users";

const authRouter: Router = Router();

authRouter.post('/login', UserController.login);
authRouter.post('/register', UserController.createUser);

export {
    authRouter
};