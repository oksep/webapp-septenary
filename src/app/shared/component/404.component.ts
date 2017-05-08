import {AfterViewInit, Component} from "@angular/core";

@Component({
    template: '<p>嗯~~这个页面还没做，你要不要试试？</p>',
})
export class PageNotFoundComponent implements AfterViewInit {
    ngAfterViewInit(): void {
    }

    constructor() {

    }
}