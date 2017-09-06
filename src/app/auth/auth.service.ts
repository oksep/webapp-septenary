import {Injectable} from "@angular/core";

import {Http} from "@angular/http";

import {AuthHttp, tokenNotExpired} from "./angular-jwt.module";

import {Credentials} from "../model/credentials";
import JwtHelper from "../util/angular-jwt";
import {Observable} from "rxjs/Observable";
import BaseHttpService, {Result} from "../util/base.server";
import {User} from "../model/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";

export const TOKEN_NAME = "@jwt-token";

class Payload {
	_id: number;
	name: string; // 用户名称
	avatar: string; // avatar.jpg
	role: 'normal' | 'admin'; // 用户角色
	iat: number; // jwt的签发时间
	exp: number; // jwt的过期时间，这个过期时间必须要大于签发时间
	iss: string; // jwt签发者
	sub: string; // jwt所面向的用户
	aud: string; // 接收jwt的一方
	nbf: string; // 定义在什么时间之前，该jwt都是不可用的.
	jti: string; // jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
}

export class AuthEvent {
	loginUser: User;

	constructor(payload: Payload) {
		if (payload) {
			this.loginUser = new User();
			this.loginUser.avatar = payload.avatar;
			this.loginUser._id = payload._id;
			this.loginUser.name = payload.name;
			this.loginUser.role = payload.role;
		}
	}
}

@Injectable()
export class AuthService extends BaseHttpService {

	private token: Payload = null;

	private eventSource: Subject<AuthEvent> = new BehaviorSubject<AuthEvent>(null);
	public events: Observable<AuthEvent> = this.eventSource.asObservable();

	constructor(http: Http, authHttp: AuthHttp) {
		super(http, authHttp);
		this.ensureLoggedIn();
	}

	// 登录
	login(credentials: Credentials) {
		return this.httpPost('/api/auth/login', credentials)
			.map((result: Result<any>) => {
				if (result.success && result.data) {
					localStorage.setItem(TOKEN_NAME, result.data.token);
					this.parseTokenToPayload();
				}
				return result;
			});
	}

	// 注册
	register(credentials: any) {
		return this.httpPost('/api/auth/register', credentials);
	}

	// 检查登录是否过期
	ensureLoggedIn(): boolean {
		if (tokenNotExpired(TOKEN_NAME)) {
			this.parseTokenToPayload();
			return true;
		} else {
			this.token = null;
			return false;
		}
	}

	getAuthName() {
		return this.token ? this.token.name : null;
	}

	// 是否是 管理员
	isAdmin() {
		return this.token ? this.token.role == 'admin' : false;
	}

	// 登录用户 ID
	getAuthId() {
		return this.token ? this.token._id : null;
	}

	// 解析 token 携带信息
	parseTokenToPayload() {
		const token: string = localStorage.getItem(TOKEN_NAME);
		if (token) {
			const jwtHelper = new JwtHelper();
			let payload = jwtHelper.decodeToken(token);
			if (payload) {
				this.token = payload as Payload;
				this.eventSource.next(new AuthEvent(this.token));
			}
		}
	}

	// 退登
	logout() {
		this.token = null;
		this.eventSource.next(new AuthEvent(null));
		localStorage.removeItem(TOKEN_NAME);
	}
}
