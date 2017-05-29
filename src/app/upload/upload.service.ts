import {Injectable} from "@angular/core";

import {Headers, Http, RequestOptions} from "@angular/http";

import {AuthHttp} from "../auth/angular-jwt.module";
import BaseHttpService from "../util/base.server";
import {Observable} from "rxjs/Observable";

export interface OnUploadCallback {
    onUploadProgress(percent: number): void;
    onUploadError(err: Error);
    onUploadComplete();
    onLoaded(result: object);
}


@Injectable()
export class UploadService extends BaseHttpService {

    constructor(http: Http, authHttp: AuthHttp) {
        super(http, authHttp);
    }

    // 上传token
    getToken(key: string) {
        return this.authHttpPost('/api/qiniu/uptoken', {key: key});
    }

    // 上传文件
    uploadFile(key: string, file: File, callback: OnUploadCallback) {
        this.getToken(key)
            .subscribe(result => {
                if (result.success) {
                    this.uploadToQiniu(file, result.data.uptoken, key, callback);
                } else {
                    callback.onUploadError(new Error());
                }
            });
    }

    // 上传文件至七牛
    private uploadToQiniu(file: File, token: string, key: string, callback: OnUploadCallback) {

        let formData = new FormData();
        formData.append('file', file, key);
        formData.append('token', token);
        formData.append('key', key);

        const request = new XMLHttpRequest();

        if (callback) {
            request.upload.addEventListener("progress", (evt) => {
                if (evt.lengthComputable) {
                    let percentComplete = evt.loaded / evt.total;
                    callback.onUploadProgress(percentComplete);
                } else {
                    // Unable to compute progress information since the total size is unknown
                }
            }, false);
            request.upload.addEventListener("load", () => callback.onUploadComplete(), false);
            request.upload.addEventListener("error", (evt) => callback.onUploadError(new Error('Upload error')), false);
            request.upload.addEventListener("abort", (evt) => callback.onUploadError(new Error('Abort error')), false);
            request.onload = (e) => callback.onLoaded(request.response ? JSON.parse(request.response) : null);
            request.onerror = (e) => callback.onUploadError(new Error('Request error'));
        }

        request.open('POST', 'http://upload.qiniu.com/', true);
        request.setRequestHeader('Accept', 'application/json');
        request.send(formData);
    }

    // unused
    private uploadNoProgress(file: File, token: string, key: string) {
        let formData: FormData = new FormData();
        let name = '七七弑神.jpg';
        formData.append('file', file, name);
        formData.append('token', token);
        formData.append('key', name);

        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        let options = new RequestOptions({headers: headers});

        this.http.post('http://upload.qiniu.com/', formData)//, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success', data),
                error => console.log(error)
            );
    }

    generateKey() {
        // let key = Math.random().toString(36).substr(2) + this.file.name.match(/\.?[^.\/]+$/);
        // return key;
    }

    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}
