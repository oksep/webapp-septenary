import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../article.service";
import {Article} from "../../model/article";
import {HeaderService} from "../../header/header.service";

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: [
        './article-detail.component.css',
        './prism_themes/prism-cb.css',
    ],
    encapsulation: ViewEncapsulation.None // 很重要，使对 marked 渲染的 innerHtml 的 css 生效
})
export class ArticleDetailComponent implements OnInit {

    article: Article;

    constructor(private headerService: HeaderService,
                private articleService: ArticleService,
                private router: Router,
                public activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.headerService.changeHeaderAbsolute(true);
        this.activeRoute.params.subscribe(params => {
            let id = params.id;
            this.articleService.getArticleDetail(id).subscribe(result => {
                if (result.success) {
                    this.article = result.data;
                }
            });
            this.articleService.debug(this.articleService.getTags());
        });
    }

    ngOnDestroy() {
        this.headerService.changeHeaderAbsolute(false);
    }


}
