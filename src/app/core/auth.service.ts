import {Injectable} from '@angular/core';

import {Http} from '@angular/http';

const JWT_TOKEN_KEY = "@jwt-token";

@Injectable()
export class AuthService {
    isLogin: boolean;

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
                if (result.success && result.data) {
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
