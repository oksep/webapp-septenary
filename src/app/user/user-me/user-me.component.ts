import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {UserService} from "../user.service";
import User from "../../model/user";


@Component({
    selector: 'app-user-login',
    templateUrl: './user-me.component.html',
    styleUrls: ['./user-me.component.css']
})
export class UserMeComponent implements OnInit {

    profile: User;

    constructor(private authService: AuthService,
                private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.getProfile();
        this.getUsers();
    }

    getProfile() {
        this.userService.getMyProfile().subscribe(result => {
            this.profile = result.data;
            console.log(this.profile);
        });
    }

    getUsers() {

    }


}
