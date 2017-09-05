import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
	selector: 'app-article-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

	constructor(private router: Router) {
		router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				window.scrollTo(0, 0);
				// jQuery('html, body').animate({scrollTop: 0}, {duration: 250});
			}
		});
	}

	ngOnInit() {
	}

}
