import {AuthHttp} from "../auth/angular-jwt.module";
import {Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

export default class BaseHttpService {
	protected http: Http;
	protected authHttp: AuthHttp;

	constructor(http: Http, authHttp: AuthHttp) {
		this.http = http;
		this.authHttp = authHttp;
	}

	authHttpPost(url: string, body: any, options?: RequestOptionsArgs) {
		return this.authHttp.post(url, body, options).catch(handleError).map(Result.parseFunc);
	}

	authHttpGet(url: string, options?: RequestOptionsArgs) {
		return this.authHttp.get(url, options).catch(handleError).map(Result.parseFunc);
	}

	httpPost(url: string, body: any, options?: RequestOptionsArgs) {
		return this.http.post(url, body, options).catch(handleError).map(Result.parseFunc);
	}

	httpGet(url: string, options?: RequestOptionsArgs) {
		return this.http.get(url, options).catch(handleError).map(Result.parseFunc);
	}

	debug(fun: Observable<any>) {
		fun.subscribe(result => {
			let debugElement = document.getElementById('debug-element');
			if (debugElement) {
				debugElement.innerHTML = syntaxHighlight(result);
			} else {
				debugElement = document.createElement('pre');
				debugElement.id = 'debug-element';
				debugElement.setAttribute("style", "position: absolute; left:0; top:0; color: white; border: 1px solid skyblue; background-color: rgba(0, 0, 0, 0.58);");
				document.body.appendChild(debugElement).innerHTML = syntaxHighlight(result);
			}
		});
	}
}

export function syntaxHighlight(json) {
	if (typeof json != 'string') {
		json = JSON.stringify(json, undefined, 2);
	}
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		var cls = 'number';
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = 'key';
			} else {
				cls = 'string';
			}
		} else if (/true|false/.test(match)) {
			cls = 'boolean';
		} else if (/null/.test(match)) {
			cls = 'null';
		}
		return '<span class="' + cls + '">' + match + '</span>';
	});
}

export function handleError(res: Response) {
	return Observable.of(res);
}

export class Result<T> {
	public success: boolean; 		// 请求是否成功处理
	public error: { message: any }; 			// 失败信息
	public data: T; 						// 成功处理返回的数据

	private static parse<T>(res: Response): Result<T> {
		let result = new Result<T>();

		// 服务器返回 500
		if (res.status >= 500) {
			result.success = false;
			result.error = {message: '服务器错误'};
		}

		// 服务器返回 400
		else if (res.status >= 400) {
			result.success = false;
			result.error = {message: `请求错误 ${res.status}`};
		}

		// 服务器正常返回
		else if (res.status >= 200) {
			try {
				result = res.json() as Result<T>
			} catch (ex) {
				console.warn(ex);
				result.success = false;
				result.error = {message: '请求成功，解析错误'};
			}
		}

		return result;
	}

	public static parseFunc = <T>(res: Response): Result<T> => {
		return Result.parse<T>(res);
	}

}