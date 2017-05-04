import * as passport from "passport";
import * as JWT from "passport-jwt";
import {StrategyOptions} from "passport-jwt";
import Config from "./config";
import User from "../model/user";

interface PayLoad {
    id: string
    role: string
}

const OPTION: StrategyOptions = {
    secretOrKey: Config.JWTSecret, // the JWT secret key.
    jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderWithScheme('Bearer'), // defines where the tokens will be sent in the response
    passReqToCallback: true
};

const JWTStrategy = new JWT.Strategy(OPTION, function (req, payload: PayLoad, done: Function) {
        let user = User.findByID(payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(new Error("User not found"), null);
        }
    }
);

passport.use('jwt', JWTStrategy);

// 初始化 passport
export function initial() {
    return passport.initialize();
}

// 身份验证
export function authenticateJWT() {
    return passport.authenticate('jwt', Config.JWTSession)
}

// 角色验证
export function authenticateAdmin() {
    return function (req, res, next) {
        if (!req.user.admin) {
            return res.sendStatus(401);
        } else {
            next();
        }
    }
}