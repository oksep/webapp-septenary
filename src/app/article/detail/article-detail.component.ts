import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../article.service";
import {Article} from "../../model/article";

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

    @ViewChild('simplemde') textarea: ElementRef;

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
                    this.article = result.data;
                }
            });
        });
    }

    initMarkdownEditor() {
        // 初始化 markdown 编辑器
        const markdownEditor = new SimpleMDE({
            element: this.textarea.nativeElement,
            // showIcons: ["code", "table"]
        });
    }

}
