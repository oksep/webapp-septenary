import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Credentials} from "../../model/credentials";
import {NotificationsService} from "../../notification/simple-notifications/services/notifications.service";

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

	credentials = new Credentials('seven__up@sina.cn', '123456'); // 凭证
	isLogging = false;

	constructor(private authService: AuthService,
							private router: Router,
							private location: Location,
							private notification: NotificationsService) {
	}

	ngOnInit() {
	}

	onLoginSubmit() {
		this.isLogging = true;
		this.authService
			.login(this.credentials)
			.subscribe(
				(result: any) => {
					this.isLogging = false;
					if (result.success) {
						this.notification.success('提示', '欢迎回来' + this.authService.getAuthName());
						// this.router.navigate(['/user/me']);
						this.location.back()
					} else {
						this.notification.error('提示', JSON.stringify(result.error));
					}
				});
	}

	onRegistryClick() {
		this.router.navigateByUrl('/user/register')
	}

}
