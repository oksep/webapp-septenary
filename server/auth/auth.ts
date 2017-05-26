import * as passport from "passport";
import * as JWT from "passport-jwt";
import {StrategyOptions} from "passport-jwt";
import {AuthConfig} from "../config";


const OPTION: StrategyOptions = {
    secretOrKey: AuthConfig.JWTSecret, // 密钥
    jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderWithScheme('Bearer'), // 指定 jwt 从请求头中取
    passReqToCallback: true
};

const JWTStrategy = new JWT.Strategy(OPTION, function (req, payload, done: Function) {
        if (payload) {
            return done(null, payload);
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
    return passport.authenticate('jwt', AuthConfig.JWTSession)
}

// 管理员验证
export function authenticateAdmin() {
    return function (req, res, next) {
        if (req.user.role !== 'admin') {
            return res.sendStatus(401);
        } else {
            next();
        }
    }
}