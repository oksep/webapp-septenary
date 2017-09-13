import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "./services/spinner.service";
import {NavigationEnd, Router} from "@angular/router";
import {visitPage} from "./util/baidu";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [SpinnerService]
})
export class AppComponent implements OnInit {
	title = 'app';

	notificationOptions = {
		timeOut: 1500,
		showProgressBar: true,
		pauseOnHover: false,
		clickToClose: false,
		position: ["top", "right"]
	};

	constructor(private spinnerService: SpinnerService,
							private router: Router) {
		router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				visitPage(event.urlAfterRedirects);
				window.scrollTo(0, 0);
			}
		});
	}

	ngOnInit(): void {
		this.spinnerService.hide(280);
	}
}
