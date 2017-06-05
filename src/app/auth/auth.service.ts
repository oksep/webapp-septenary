import {Injectable} from "@angular/core";

import {Http} from "@angular/http";

import {tokenNotExpired} from "./angular-jwt.module";

import {Credentials} from "../model/credentials";
import JwtHelper from "../util/angular-jwt";
import {Observable} from "rxjs/Observable";

export const TOKEN_NAME = "@jwt-token";

class Payload {
    _id: number;
    name: string; // 用户名称
    avatar: string; // avatar
    role: string; // 用户角色
    iat: number; // jwt的签发时间
    exp: number; // jwt的过期时间，这个过期时间必须要大于签发时间
    iss: string; // jwt签发者
    sub: string; // jwt所面向的用户
    aud: string; // 接收jwt的一方
    nbf: string; // 定义在什么时间之前，该jwt都是不可用的.
    jti: string; // jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
}

@Injectable()
export class AuthService {
    loggedIn: boolean = false;
    tokenPayload: Payload;

    constructor(private http: Http) {
        this.ensureLoggedIn();
        this.ensureTokenPayload();
    }

    // static validateToken(token) {
    //     let helper = new JwtHelper();
    //     console.log(
    //         'TOKEN',
    //         helper.decodeToken(token),
    //         helper.getTokenExpirationDate(token),
    //         helper.isTokenExpired(token)
    //     );
    //     tokenNotExpired();
    // }

    // 登录
    login(credentials: Credentials) {
        return this.http
            .post('/api/auth/login', credentials)
            .map(res => {
                const result = res.json();
                this.loggedIn = true;
                if (result.success && result.data) {
                    localStorage.setItem(TOKEN_NAME, result.data.token);
                    this.ensureTokenPayload();
                }
                return result;
            })
            .catch((err) => {
                return Observable.of(err.json());
            });
    }

    // 注册
    register(credentials: any) {
        return this.http
            .post('/api/auth/register', credentials)
            .map(response => response.json())
            .catch((err) => {
                return Observable.of(err.json());
            });
    }

    // 检查登录是否过期
    ensureLoggedIn(): boolean {
        this.loggedIn = tokenNotExpired(TOKEN_NAME);
        if (!this.loggedIn) {
            this.tokenPayload = null
        }
        return this.loggedIn;
    }

    // 取登录状态
    getLoggedIn() {
        return this.loggedIn
    }

    getAuthName() {
        return this.tokenPayload ? this.tokenPayload.name : null;
    }

    getAuthAvatar() {
        return this.tokenPayload ? this.tokenPayload.avatar : null;
    }

    getAuthId() {
        return this.tokenPayload ? this.tokenPayload._id : null;
    }

    // 是否是 管理员
    isAdmin() {
        return this.tokenPayload && this.tokenPayload.role == 'admin';
    }

    // token 携带信息
    ensureTokenPayload() {
        const token: string = localStorage.getItem(TOKEN_NAME);
        if (token) {
            const jwtHelper = new JwtHelper();
            let payload = jwtHelper.decodeToken(token);
            if (payload) {
                this.tokenPayload = payload as Payload;
                console.log('Payload', payload);
            }
        }
    }

    // 退登
    logout() {
        this.loggedIn = false;
        this.tokenPayload = null;
        localStorage.removeItem(TOKEN_NAME);
    }
}
