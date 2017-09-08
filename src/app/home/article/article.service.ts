import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthHttp} from "../../auth/angular-jwt.module";
import BaseHttpService, {Result} from "../../util/base.server";
import {Article} from "../../model/article";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ArticleService extends BaseHttpService {
	private tags: { _id: string, count: number }[] = [];

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

	getTags(cache: boolean = false) {
		if (cache) {
			return Observable.of(this.tags);
		} else {
			return this.httpGet('/api/article/tags')
				.map((result: Result<{ _id: string, count: number }[]>) => {
					if (result) {
						this.tags = result.data;
					}
					return this.tags;
				});
		}
	}

	listArticlesByColumnist(page: number, columnist: number) {
		return this.httpGet(`/api/article/columnist/${columnist}/${page}`);
	}
}