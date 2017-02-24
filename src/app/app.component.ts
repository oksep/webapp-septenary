import {Component, OnInit, AfterViewInit} from '@angular/core';

const $ = jQuery;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
    headerAndContentMinHeight = 300;
    footerHeight = 0;

    constructor() {
        $(window).resize(() => this.onWindowSizeChange());
    }

    ngOnInit(): void {
        onBootstrap(1000);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.onWindowSizeChange();
        });
    }

    onWindowSizeChange() {
        let h = $(window).height() - document.getElementById("app-footer").offsetHeight;
        this.headerAndContentMinHeight = h > 0 ? h : 0;
    }
}
