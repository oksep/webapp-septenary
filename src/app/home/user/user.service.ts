import {Injectable} from "@angular/core";

import {Http} from "@angular/http";

import {AuthHttp} from "../../auth/angular-jwt.module";
import BaseHttpService from "../../util/base.server";
import {User} from "../../model/user";


@Injectable()
export class UserService extends BaseHttpService {

	constructor(http: Http, authHttp: AuthHttp) {
		super(http, authHttp);
	}

	listUsers() {
		return this.authHttpGet('/api/user/list');
	}

	getProfileById(id: number) {
		return this.httpGet(`/api/user/profile/${id}`);
	}

	uploadUser(user: User) {
		return this.authHttpPost(`/api/user/profile/update`, user);
	}
}
