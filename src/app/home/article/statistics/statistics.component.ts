import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {ArticleService} from "../article.service";

export class StatisticsOverview {
	users: number;
	articles: number;
	visits: number;
}

@Component({
	selector: 'app-widget-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

	currentTime: Date;

	tick = 0;

	sub: Subscription;

	overview: StatisticsOverview;

	constructor(private articleService: ArticleService) {
		this.currentTime = new Date();
	}

	ngOnInit() {
		let timer = Observable.timer(0, 1000);
		this.sub = timer.subscribe(t => this.tickerFunc(t));
		this.articleService.getStatisticsOverview(true)
			.subscribe((overview: StatisticsOverview) => {
				this.overview = overview;
			});
	}

	tickerFunc(tick) {
		this.tick = tick;
	}

	ngOnDestroy() {
		this.sub && this.sub.unsubscribe();
	}

}
