import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../article.service";
import {Article} from "../../model/article";

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

    constructor(private articleService: ArticleService,
                private router: Router,
                public activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        // this.initMarkdownEditor();
        this.activeRoute.params.subscribe(params => {
            let id = params.id;
            this.articleService.getArticleDetail(id).subscribe(result => {
                if (result.success) {
                    // result.data.content =  result.data.content;
                    this.article = result.data;
                }
            });
        });
    }
}
