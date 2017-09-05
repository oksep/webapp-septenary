import {Component, Input} from "@angular/core";

@Component({
	selector: 'article-tag',
	template: `
      <a class="tag" [routerLink]="'/tag/' + tag">
          {{tag}}{{weight > 1 ? '&nbsp;x&nbsp;' + weight : null}}
      </a>
	`,
	styleUrls: ['./article-tag.component.scss']
})
export class ArticleTagComponent {
	@Input() tag: string;
	@Input() weight: number;
}