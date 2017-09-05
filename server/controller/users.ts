import {NextFunction} from "express";
import {Request, Response} from "../middleware/result";
import User from "../model/user";
import {AuthConfig} from "../config";
import * as moment from "moment";
import * as JWT from "jwt-simple";

class Payload {
	_id: string;
	name: string; // 用户名称
	avatar: string; // avatar.jpg
	role: string; // 用户角色
	iat: number; // jwt的签发时间
	exp: number; // jwt的过期时间，这个过期时间必须要大于签发时间
	iss: string; // jwt签发者
	sub: string; // jwt所面向的用户
	aud: string; // 接收jwt的一方
	nbf: string; // 定义在什么时间之前，该jwt都是不可用的.
	jti: string; // jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
}

// 登录
export function login(request: Request, response: Response, next: NextFunction) {
	let email = request.body.email;
	let password = request.body.password;
	User.findOne({'email': email, 'password': password})
		.exec()
		.then(doc => {
			if (password = doc.email) {
				const payload = new Payload();
				payload._id = doc._id;
				payload.name = doc.name;
				payload.avatar = doc.avatar;
				payload.role = doc.role;
				payload.iat = moment().unix();
				payload.exp = moment().add(AuthConfig.JWTExpiration, 'minute').unix();
				response.success({
					token: JWT.encode(payload, AuthConfig.JWTSecret) // jwt 签发
				});
			} else {
				response.failed('帐号或密码错误');
			}
		})
		.catch(err => {
			response.failed('帐号或密码错误');
		});
}

// 注册
export function createUser(request: Request, response: Response, next: NextFunction) {
	let user = new User(request.body);
	user.save()
		.then(doc => {
			response.success(doc);
		})
		.catch(err => {
			response.status(200);
			response.failed(err);
		});
}

// 列出用户列表
export function listUsers(request: Request, response: Response) {
	response.success({
		message: 'ok'
	});
}

// 查询用户 profile
export function getProfile(request: Request, response: Response, next: NextFunction) {
	User.findById(request.params.id)
		.then(doc => {
			doc = JSON.parse(JSON.stringify(doc));
			delete doc.password;
			response.success(doc);
		})
		.catch(err => {
			response.status(200);
			response.failed(err);
		});
}