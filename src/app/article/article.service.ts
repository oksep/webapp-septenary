import {Injectable} from "@angular/core";
import {AuthHttp} from "../auth/angular-jwt.module";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ArticleService {

    constructor(private http: Http, private authHttp: AuthHttp) {
    }

    createArticle(article: object) {
        return this.authHttp
            .post('/api/article/create', article)
            .map(response => response.json())
            .catch((err) => {
                return Observable.of(err.json());
            });
    }

    getArticleDetail(id: number) {
        return this.authHttp
            .get(`/api/article/detail/${id}`)
            .map(response => response.json())
            .catch((err) => {
                return Observable.of(err.json());
            });
    }

    listArticles(page: number) {
        return this.http
            .get(`/api/article/page/${page}`)
            .map(response => response.json())
            .catch((err) => {
                return Observable.of(err.json());
            });
    }
}
