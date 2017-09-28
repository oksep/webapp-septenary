import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthHttp} from "../../auth/angular-jwt.module";
import BaseHttpService, {Result} from "../../util/base.server";
import {Article} from "../../model/article";
import {Comment} from "../../model/comment";
import {Observable} from "rxjs/Observable";
import {StatisticsOverview} from "./statistics/statistics.component";

@Injectable()
export class ArticleService extends BaseHttpService {
	private tags: { _id: string, count: number }[] = [];
	private statisticsOverview: StatisticsOverview;

	constructor(http: Http, authHttp: AuthHttp) {
		super(http, authHttp);
	}

	createArticle(article: object) {
		this.tags = [];
		this.statisticsOverview = null;
		return this.authHttpPost('/api/article/create', article);
	}

	modifyArticle(article: object) {
		this.tags = [];
		return this.authHttpPost('/api/article/update', article);
	}

	deleteArticle(article: Article) {
		this.tags = [];
		this.statisticsOverview = null;
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
		if (cache && this.tags && this.tags.length > 0) {
			return Observable.of(this.tags);
		}
		return this.httpGet('/api/article/tags')
			.map((result: Result<{ _id: string, count: number }[]>) => {
				if (result) {
					this.tags = result.data;
				}
				return this.tags;
			});
	}

	listArticlesByColumnist(page: number, columnist: number) {
		return this.httpGet(`/api/article/columnist/${columnist}/${page}`);
	}

	getStatisticsOverview(cache: boolean = false) {
		if (cache && this.statisticsOverview) {
			return Observable.of(this.statisticsOverview);
		}
		return this.httpGet('/api/statistics/overview').map((result: Result<StatisticsOverview>) => {
			this.statisticsOverview = result.data;
			return result.success ? result.data : null;
		});
	}

	listComments(article: number, page: number) {
		return this.httpGet(`/api/comment/${article}/${page}`);
	}

	createComment(comment: Comment) {
		return this.httpPost(`/api/comment/create`, comment);
	}

	deleteComment(comment: Comment) {
		return this.authHttpPost(`/api/comment/delete`, {id: comment._id});
	}

	getLastComment(): Comment {
		let comment = localStorage.getItem("@last-comment");
		return comment ? JSON.parse(comment) : null;
	}

	setLastComment(comment: Comment) {
		localStorage.setItem("@last-comment", comment ? JSON.stringify(comment) : null);
	}
}