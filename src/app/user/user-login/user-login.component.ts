import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {UserService} from "../user.service";
import {Credentials} from "../../model/credentials";
import Result from "../../model/result";
import User from "../../model/user";

class Alert {
    type: string;
    message: string;

    constructor(type: string, message: string) {
    }
}

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

    credentials = new Credentials('seven__up@sina.cn', '123456'); // 凭证
    alertMessage = "欢迎回来";
    isLogging = false;
    alertType = 'info';

    constructor(private authService: AuthService,
                private userService: UserService,
                private router: Router,
                public activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }

    onLoginSubmit() {
        this.isLogging = true;
        this.authService.login(this.credentials).subscribe((result) => {
            this.isLogging = false;
            if (result.success) {
                this.router.navigate(['']);
                this.getProfile();
            } else {
                this.alertType = 'danger';
                this.alertMessage = result.description;
            }
        });
    }

    getProfile() {
        this.userService.getMyProfile().subscribe((result: Result) => {
            if (result.success) {
                if (result.data.profile) {
                    let myProfile = User.wrap(result.data.profile);
                }
            }
        });
    }

    onRegistryClick() {
        this.router.navigateByUrl('/user/register')
    }

    setAlertClasses(type) {
        return {
            'alert-danger': this.alertType == 'danger',
            'alert-info': this.alertType != 'danger'
        };
    }

}
