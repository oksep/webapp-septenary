import {AuthHttp} from "../auth/angular-jwt.module";
import {Http, RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs/Observable";

export default class BaseHttpService {
    private http: Http;
    private authHttp: AuthHttp;

    constructor(http: Http, authHttp: AuthHttp) {
        this.http = http;
        this.authHttp = authHttp;
    }

    authHttpPost(url: string, body: any, options?: RequestOptionsArgs) {
        return this.authHttp.post(url, body, options).map(jsonMap).catch(handleError);
    }

    authHttpGet(url: string, options?: RequestOptionsArgs) {
        return this.authHttp.get(url, options).map(jsonMap).catch(handleError);
    }

    httpPost(url: string, body: any, options?: RequestOptionsArgs) {
        return this.http.post(url, body, options).map(jsonMap).catch(handleError);
    }

    httpGet(url: string, options?: RequestOptionsArgs) {
        return this.http.get(url, options).map(jsonMap).catch(handleError);
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

function syntaxHighlight(json) {
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

function jsonMap(response): object {
    return response.json()
}

function handleError(err) {
    let error;
    if (typeof err.json === "function") {
        error = err.json();
    } else {
        error = {error: err.message};
    }
    console.error(error);
    return Observable.of(error);
}