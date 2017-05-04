import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {UserService} from "../user.service";

class Credentials {
    email: string;
    password: string;

    constructor() {
        this.email = 'seven__up@sina.cn';
        this.password = '123456';
    }
}

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

    credentials = new Credentials(); // 凭证
    alertMessage = "欢迎回来";
    isLogging = false;
    alertType = 'info';

    constructor(private authService: AuthService,
                private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        // this.userService.getMyProfile().subscribe(result => {
        //     console.log('AAAAA', result);
        // });
    }

    onLoginSubmit() {
        this.isLogging = true;
        this.authService.login(this.credentials).subscribe((result) => {
            this.isLogging = false;
            if (result.success) {
                this.router.navigate(['']);
                this.listUsers();
            } else {
                this.alertType = 'danger';
                this.alertMessage = result.description;
            }
        });
    }

    listUsers() {
        // this.userService.listUsers().subscribe(result => {
        //     console.warn('AAAA', result);
        // });
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
