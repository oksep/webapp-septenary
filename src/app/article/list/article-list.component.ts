import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../article.service";
import {Article} from "../../model/article";

import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot} from "@angular/router";

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    heroes = [
        {name: 'AAA'},
        {name: 'AAA'}
    ];

    articles: Article[];

    msg: object = null;

    constructor(private articleService: ArticleService,
                private router: Router,
                public activeRoute: ActivatedRoute) {
    }

    ngOnInit() {

        let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activeRoute.snapshot;
        let routerState: RouterState = this.router.routerState;
        let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

        console.log('111', activatedRouteSnapshot);
        console.log('222', routerState);
        console.log('333', routerStateSnapshot);

        this.activeRoute.params.subscribe(params => {
            let page = params.page || 1;
            this.articleService.listArticles(page).subscribe(result => {
                console.log('Articles:', result);
                this.articles = result.data.list
            });
        });
    }


    get message() {
        return JSON.stringify(this.msg)
    }

}
