import {Component, Input} from "@angular/core";

@Component({
    selector: 'article-tag',
    template: `
        <a class="tag" [class.tag-light]="light" [class.tag-gray]="!light" [routerLink]="'/tag/' + tag">
            {{tag}}
        </a>
    `,
    styleUrls: ['./article-tag.component.css']
})
export class ArticleTagComponent {
    @Input() tag: string;
    @Input() light: boolean =false;
}