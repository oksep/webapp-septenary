import {Component, Inject, Input, ViewEncapsulation} from "@angular/core";
import {Toc} from "../../../../markdown/markdown.component";
import {DOCUMENT} from "@angular/common";

@Component({
	selector: 'app-article-toc',
	templateUrl: './toc.component.html',
	styleUrls: [
		'./toc.component.scss',
	],
	encapsulation: ViewEncapsulation.None // 很重要，使对 marked 渲染的 innerHtml 的 css 生效
})
export class ArticleTocComponent {

	@Input() toc: Toc[];
	@Input() title: string;

	constructor(@Inject(DOCUMENT) private document: any) {
	}

	onTocClick(t: Toc) {
		let element = this.document.getElementById(t.anchor);
		if (element) {
			let rect = element.getBoundingClientRect();
			let y = rect.top + window.scrollY;
			jQuery('html, body').animate({scrollTop: y - 60}, {duration: 120});
		}
	}

}
