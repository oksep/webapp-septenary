import {Router} from "express";
import * as Auth from "../auth/auth";

import * as UserController from "../controller/users";

const userRouter: Router = Router();

userRouter.get("/list", Auth.authenticateJWT(), Auth.authenticateAdmin(), UserController.listUsers);

userRouter.get("/me", Auth.authenticateJWT(), UserController.getProfile);

export {userRouter};