import {Injectable} from "@angular/core";
import {AuthHttp} from "../auth/angular-jwt.module";
import {Http} from "@angular/http";
import BaseHttpService from "../util/base.server";

@Injectable()
export class ArticleService extends BaseHttpService {

    constructor(http: Http, authHttp: AuthHttp) {
        super(http, authHttp);
    }

    createArticle(article: object) {
        return this.authHttpPost('/api/article/create', article);
    }

    getArticleDetail(id: number) {
        return this.httpGet(`/api/article/detail/${id}`);
    }

    listArticles(page: number) {
        return this.httpGet(`/api/article/page/${page}`);
    }

    getTags() {
        return this.httpGet('/api/article/tags');
    }

}