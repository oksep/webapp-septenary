import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "./services/spinner.service";

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

	constructor(private spinnerService: SpinnerService) {

	}

	ngOnInit(): void {
		this.spinnerService.hide(1000);
	}
}
