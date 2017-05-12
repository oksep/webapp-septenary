import {Injectable} from "@angular/core";

import {Http} from "@angular/http";

import {AuthHttp} from "../auth/angular-jwt.module";
import {Observable} from "rxjs/Observable";


@Injectable()
export class UserService {

    constructor(private http: Http, private authHttp: AuthHttp) {
    }

    getMyProfile() {
        return this.authHttp
            .get('/api/user/me')
            .map(response => response.json())
            .catch((err) => {
                return Observable.of(err.json());
            });
    }

    listUsers() {
        return this.authHttp
            .get('/api/user/list')
            .map(response => response.json())
            .catch((err) => {
                return Observable.of(err.json());
            });
    }
}
