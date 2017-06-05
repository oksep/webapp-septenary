import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";

import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../../model/article";

@Component({
    selector: 'app-article-section',
    templateUrl: './article-section.component.html',
    styleUrls: ['./article-section.component.css'],
    encapsulation: ViewEncapsulation.None // 很重要，使对 marked 渲染的 innerHtml 的 css 生效
})
export class ArticleSectionComponent implements OnInit {

    @Input() article: Article;
    @Input() isHead: boolean;
    @Input() isTail: boolean;

    constructor(private router: Router, public activeRoute: ActivatedRoute) {

    }

    ngOnInit() {

    }

    onSectionClick() {
        this.router.navigateByUrl('/article/' + this.article._id);
    }

}
