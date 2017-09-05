import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../article.service";
import {Article} from "../../../model/article";

import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

class Pagination {
	limit: number;
	offset: number;
	total: number;
	pages: number[];
	urlPrefix: string;

	constructor(urlPrefix) {
		this.urlPrefix = urlPrefix;
	}
}

@Component({
	selector: 'app-article-list',
	templateUrl: './article-list.component.html',
	styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

	pagination: Pagination;
	articles: Article[];
	currentPage: number = 1;

	constructor(private articleService: ArticleService, private router: Router, public activeRoute: ActivatedRoute) {
	}

	ngOnInit() {
		let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activeRoute.snapshot;
		let routerState: RouterState = this.router.routerState;
		let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

		// console.log(activatedRouteSnapshot, routerState, routerStateSnapshot);

		this.activeRoute.params.subscribe(params => {
			console.warn('Params', params);

			this.currentPage = params.page || 1;
			let observer: Observable<any> = null;
			let urlPrefix = null;

			if (params.category) {
				observer = this.articleService.listArticlesByCategory(this.currentPage, params.category);
				urlPrefix = `/category/${params.category}`;
			} else if (params.tag) {
				observer = this.articleService.listArticlesByTag(this.currentPage, params.tag);
				urlPrefix = `/tag/${params.tag}`;
			} else {
				observer = this.articleService.listArticles(this.currentPage);
				urlPrefix = `/page`;
			}

			observer.subscribe(result => {
				let data = result.data;
				this.articles = data.docs;
				delete data.docs;
				this.pagination = new Pagination(urlPrefix);
				Object.assign(this.pagination, data);
				this.pagination.pages = Array.from(Array(Math.ceil(this.pagination.total / this.pagination.limit)).keys()).map(page => page + 1);
			});
		});
	}

	onPaginationClick(page: number) {
		this.router.navigateByUrl(`${this.pagination.urlPrefix}/${page}`);
	}
}
