import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
	selector: 'app-widget-statics',
	templateUrl: './statics.component.html',
	styleUrls: ['./statics.component.scss']
})
export class StaticsComponent implements OnInit, OnDestroy {

	currentTime = new Date();

	tick = 0;

	private sub: Subscription;

	ngOnInit() {
		let timer = Observable.timer(0, 1000);
		this.sub = timer.subscribe(t => this.tickerFunc(t));
	}

	tickerFunc(tick) {
		this.tick = tick;
	}

	ngOnDestroy() {
		this.sub && this.sub.unsubscribe();
	}

}
