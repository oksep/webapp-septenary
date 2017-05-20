import {Component, Input} from "@angular/core";

@Component({
    selector: 'article-tag',
    template: `
        <a class="tag"
           [class.tag-light]="light"
           [class.tag-gray]="!light"
           [routerLink]="'/tag/' + tag"
        >
            {{value}}
        </a>
    `,
    styleUrls: ['./article-tag.component.css']
})
export class ArticleTagComponent {
    @Input() tag: string;
    @Input() weight: number;
    @Input() light: boolean = false;

    get value() {
        return this.weight > 1 ? this.tag + ' x ' + this.weight : this.tag;
    }
}