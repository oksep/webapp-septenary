import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {Article} from "../../model/article";

const $ = jQuery;

@Component({
    selector: 'article-header',
    templateUrl: './article-header.component.html',
    styleUrls: ['./article-header.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {

    @Input() article: Article;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {

    }


}
