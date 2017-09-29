import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Credentials} from "../../model/credentials";
import {NotificationsService} from "../../notification/simple-notifications/services/notifications.service";
import {Result} from "../../util/base.server";

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

	credentials = new Credentials(); // 凭证
	isLogging = false;

	constructor(private authService: AuthService,
							private router: Router,
							private location: Location,
							private notification: NotificationsService) {
	}

	ngOnInit() {
	}

	onLoginSubmit(value: Credentials) {
		this.isLogging = true;
		this.authService
			.login(value)
			.subscribe(
				(result: Result<any>) => {
					this.isLogging = false;
					if (result.success) {
						this.notification.success('提示', '欢迎回来' + this.authService.getAuthName());
						// this.router.navigate(['/user/me']);
						// this.location.back()
						this.router.navigateByUrl('/');
					} else {
						this.notification.error('提示', result.error.message);
					}
				});
	}

	onRegistryClick() {
		this.router.navigateByUrl('/user/register')
	}

}
