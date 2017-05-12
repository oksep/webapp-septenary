import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {UserService} from "../user.service";
import {Credentials} from "../../model/credentials";

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
        this.authService
            .login(this.credentials)
            .subscribe(
                (result: any) => {
                    this.isLogging = false;
                    if (result.success) {
                        this.router.navigate(['/user/me']);
                    } else {
                        this.alertType = 'danger';
                        this.alertMessage = result.error.message;
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
