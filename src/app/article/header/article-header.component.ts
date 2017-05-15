import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {Article} from "../../model/article";

const $ = jQuery;

@Component({
    selector: 'article-header',
    templateUrl: './article-header.component.html',
    styleUrls: ['./article-header.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {

    _article: Article;

    constructor() {
    }

    @Input()
    set article(article: Article) {
        this._article = article;
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {

    }


}
