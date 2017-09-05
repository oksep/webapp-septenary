import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {UserService} from "../user.service";
import {User} from "../../../model/user";
import {Result} from "../../../util/base.server";


@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	profile: User;

	constructor(private authService: AuthService,
							private userService: UserService,
							private router: Router) {
	}

	ngOnInit() {
		this.getProfile();
	}

	getProfile() {
		this.userService.getProfileById(this.authService.getAuthId()).subscribe((result: Result<any>) => {
			if (result.success) {
				this.profile = result.data;
			}
		});
	}

}
