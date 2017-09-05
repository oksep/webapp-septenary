// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-slim-loading-bar

import {Component, Input, OnInit} from "@angular/core";

import {
    isPresent,
    SlimLoadingBarEvent,
    SlimLoadingBarEventType,
    SlimLoadingBarService
} from "./slim-loading-bar.service";

/**
 * A Slim Loading Bar components shows message loading progress bar on the top of web page or parent components.
 */
@Component({
    selector: 'slim-loading-bar',
    templateUrl: 'slim-loading-bar.component.html',
    styleUrls: ['slim-loading-bar.component.css']
})
export class SlimLoadingBarComponent implements OnInit {

    @Input() progress: string = '0';
    @Input() color: string = 'firebrick';
    @Input() height: string = '2px';
    @Input() show: boolean = true;

    constructor(public service: SlimLoadingBarService) {
    }

    ngOnInit(): any {
        this.service.events.subscribe((event: SlimLoadingBarEvent) => {
            if (event.type === SlimLoadingBarEventType.PROGRESS && isPresent(event.value)) {
                this.progress = event.value;
            } else if (event.type === SlimLoadingBarEventType.COLOR) {
                this.color = event.value;
            } else if (event.type === SlimLoadingBarEventType.HEIGHT) {
                this.height = event.value;
            } else if (event.type === SlimLoadingBarEventType.VISIBLE) {
                this.show = event.value;
            }
        });
    }
}
