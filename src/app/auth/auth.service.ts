import {Injectable} from "@angular/core";

import {Http} from "@angular/http";

import {tokenNotExpired} from "./angular-jwt.module";

export const TOKEN_NAME = "@jwt-token";

@Injectable()
export class AuthService {
    loggedIn: boolean = false;

    constructor(private http: Http) {
        this.checkLoggedIn();
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
    login(credentials: any) {
        return this.http
            .post('/api/auth/login', credentials)
            .map(response => response.json())
            .map(result => {
                this.loggedIn = true;
                if (result.success && result.data) {
                    console.log('登录成功', this.loggedIn);
                    localStorage.setItem(TOKEN_NAME, result.data.token);
                }
                return result;
            });
    }

    // 注册
    register(credentials: any) {
        return this.http
            .post('/api/auth/register', credentials)
            .map(response => response.json())
            .map(result => {
                return result;
            });
    }

    // 检查登录是否过期
    checkLoggedIn(): boolean {
        this.loggedIn = tokenNotExpired(TOKEN_NAME);
        return this.loggedIn;
    }

    // 取登录状态
    getLoggedIn() {
        return this.loggedIn
    }

    // 退登
    logout() {
        this.loggedIn = false;
        localStorage.removeItem(TOKEN_NAME);
        console.log('退出登录');
    }
}
