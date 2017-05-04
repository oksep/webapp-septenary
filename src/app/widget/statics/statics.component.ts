import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'widget-statics',
    templateUrl: './statics.component.html',
    styleUrls: ['./statics.component.css']
})
export class StaticsComponent implements OnInit {

    public currentTime: Date = new Date();

    constructor() {
        window.setInterval(
            () => this.currentTime = new Date()
            , 1000
        );
    }

    ngOnInit() {
    }

}
