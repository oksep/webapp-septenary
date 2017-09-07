import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthHttp} from "../../auth/angular-jwt.module";
import BaseHttpService from "../../util/base.server";
import {Article} from "../../model/article";

@Injectable()
export class ArticleService extends BaseHttpService {

    constructor(http: Http, authHttp: AuthHttp) {
        super(http, authHttp);
    }

    createArticle(article: object) {
        return this.authHttpPost('/api/article/create', article);
    }

		modifyArticle(article: object) {
			return this.authHttpPost('/api/article/update', article);
		}

		deleteArticle(article: Article) {
			return this.authHttpPost('/api/article/delete', {id: article._id});
		}

    getArticleDetail(id: number) {
        return this.httpGet(`/api/article/detail/${id}`);
    }

    listArticles(page: number) {
        return this.httpGet(`/api/article/page/${page}`);
    }

    listArticlesByTag(page: number, tag: string) {
        return this.httpGet(`/api/article/tag/${tag}/${page}`);
    }

    listArticlesByCategory(page: number, category: string) {
        return this.httpGet(`/api/article/category/${category}/${page}`);
    }

    getTags() {
        return this.httpGet('/api/article/tags');
    }

		listArticlesByColumnist(page: number, columnist: number) {
			return this.httpGet(`/api/article/columnist/${columnist}/${page}`);
		}
}