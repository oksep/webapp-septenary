import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Toc} from "../../../markdown/markdown.component";

@Component({
    selector: 'app-article-toc',
    templateUrl: './toc.component.html',
    styleUrls: [
        './toc.component.css',
    ],
    encapsulation: ViewEncapsulation.None // 很重要，使对 marked 渲染的 innerHtml 的 css 生效
})
export class ArticleTocComponent {

    @Input() toc: Toc ;

    constructor() {

    }

    onTagContentClick() {
        window.scrollTo(0, 0);
    }
}
