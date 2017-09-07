import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";
import {Result} from "../../../util/base.server";
import {User} from "../../../model/user";
import {AuthService} from "../../../auth/auth.service";
import {NotificationsService} from "../../../notification/simple-notifications/services/notifications.service";

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	profile: User;
	editable: boolean = false;
	authId: number;

	constructor(private activeRoute: ActivatedRoute,
							private authService: AuthService,
							private notifyService: NotificationsService,
							private userService: UserService) {
	}

	ngOnInit() {
		this.authId = this.authService.getAuthId();
		this.getProfile();
	}

	getProfile() {
		this.activeRoute.params.subscribe(params => {
			this.userService.getProfileById(params.id).subscribe((result: Result<any>) => {
				if (result.success) {
					this.profile = result.data;
					this.editable = this.authService.getAuthId() == this.profile._id;
				}
			});
		});
	}

	onChangeAvatar(avatar: string) {
		if (this.profile) {
			this.profile.avatar = avatar;
			this.userService.uploadUser(this.profile).subscribe((result: Result<any>) => {
				if (result.success) {
					this.profile = result.data;
					this.notifyService.success('提示', '修改头像成功!');
				} else {
					this.notifyService.error('提示', '修改头像失败!');
				}
			})
		}
	}

}
