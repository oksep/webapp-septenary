import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";

import {Router} from "@angular/router";
import {Article} from "../../../../model/article";

@Component({
	selector: 'app-article-section',
	templateUrl: './article-section.component.html',
	styleUrls: ['./article-section.component.scss'],
	encapsulation: ViewEncapsulation.None // 很重要，使对 marked 渲染的 innerHtml 的 css 生效
})
export class ArticleSectionComponent implements OnInit {

	@Input() article: Article;

	@Input() randomInClass: string;

	imageLoaded: false;

	constructor(private router: Router) {
		this.randomInClass = 'fadeInUp';
	}

	ngOnInit() {

	}

	onSectionClick() {
		this.router.navigateByUrl('/article/' + this.article._id);
	}

}
