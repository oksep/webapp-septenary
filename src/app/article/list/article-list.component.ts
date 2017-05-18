import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../article.service";
import {Article} from "../../model/article";

import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot} from "@angular/router";
import {HeaderService} from "../../header/header.service";

class Pagination {
    limit: number;
    offset: number;
    total: number;
    pages: number[];
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

    constructor(private headerService: HeaderService, private articleService: ArticleService, private router: Router, public activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activeRoute.snapshot;
        let routerState: RouterState = this.router.routerState;
        let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

        console.log(activatedRouteSnapshot, routerState, routerStateSnapshot);

        this.activeRoute.params.subscribe(params => {
            this.currentPage = params.page || 1;
            this.articleService.listArticles(this.currentPage).subscribe(result => {
                let data = result.data;
                this.articles = data.docs;
                delete data.docs;
                this.pagination = new Pagination();
                Object.assign(this.pagination, data);
                this.pagination.pages = Array.from(Array(Math.ceil(this.pagination.total / this.pagination.limit)).keys()).map(page => page + 1);
                console.log('Articles:', this.pagination);
            });
        });
    }


    get message() {
        return JSON.stringify(this.articles)
    }

    // articleLinker(article: Article) {
    //     return `/article/${article.articleID}`;
    // }

}
