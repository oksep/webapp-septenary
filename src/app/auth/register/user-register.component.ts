import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NotificationsService} from "../../notification/simple-notifications/services/notifications.service";
import {Result} from "../../util/base.server";

class Credentials {
	email: string;
	password: string;
	name: string;
	inviteCode: string;

	constructor() {
	}
}

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
})
export class UserRegisterComponent implements OnInit {
	credentials = new Credentials(); // 凭证

	constructor(private authService: AuthService,
							private notifyService: NotificationsService,
							private router: Router) {
	}

	ngOnInit() {
	}

	onRegisterSubmit() {
		this.authService.register(this.credentials).subscribe((result: Result<any>) => {
			if (result.success) {
				this.notifyService.success('提示', '注册成功，请登录');
				this.router.navigate(['/auth/login']);
			} else {
				this.notifyService.warn('提示', result.error.message);
			}
		});
	}

}
