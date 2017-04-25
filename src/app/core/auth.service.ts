import {Injectable} from '@angular/core';

import {Http} from '@angular/http';

const JWT_TOKEN_KEY = "@jwt-token";

@Injectable()
export class AuthService {
    isLogin: boolean = false;

    constructor(private http: Http) {
    }

    getMsg() {
        return 'Hhahahahahha';
    }

    isLoginUser(): boolean {
        return this.isLogin
    }

    login(loginUser: any) {
        return this.http
            .post('/api/auth/login', loginUser)
            .map(response => response.json())
            .map(result => {
                console.warn('登录成功:', result.data.token);
                if (result.success && result.data) {
                    this.isLogin = true;
                    localStorage.setItem(JWT_TOKEN_KEY, result.data.token);
                } else {
                    localStorage.removeItem(JWT_TOKEN_KEY);
                }
                return result;
            });

    }

    test() {
        this.http.get('/api/test').map(response => response.json()).subscribe(result => {
            console.log('Hello test API', result);
        });
    }

    logout() {
        this.isLogin = false;
        localStorage.removeItem(JWT_TOKEN_KEY);
    }
}
