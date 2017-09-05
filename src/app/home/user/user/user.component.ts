import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";
import {Result} from "../../../util/base.server";
import {User} from "../../../model/user";

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	profile: User;

	constructor(private activeRoute: ActivatedRoute, private userService: UserService) {
	}

	ngOnInit() {
		this.getProfile();
	}

	getProfile() {
		this.activeRoute.params.subscribe(params => {
			this.userService.getProfileById(params.id).subscribe((result: Result<any>) => {
				if (result.success) {
					this.profile = result.data;
				}
			});
		});
	}

}
