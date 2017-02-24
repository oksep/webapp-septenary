import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../core/auth.service'

interface ILoginUser {
    email?: string;
    password?: string;
}

class LoginUser {
    email: string;
    password: string;

    constructor(loginUser: ILoginUser = {} as ILoginUser) {
        this.email = loginUser.email;
        this.password = loginUser.password;
    }
}

class Alert {
    type: string;
    message: string;

    constructor(type: string, message: string) {
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginUser = new LoginUser();
    alert = new Alert('info', "欢迎回来");
    isLogging = false;

    constructor(private mAuthService: AuthService, private mRouter: Router) {
    }

    ngOnInit() {

    }

    onLoginSubmit() {
        this.isLogging = true;
        this.mAuthService.login(this.loginUser).subscribe((result) => {
            this.isLogging = false;
            if (result.success) {
                this.mRouter.navigate(['/home']);
            } else {
                this.alert.type = 'danger';
                this.alert.message = result.description;
            }
        });
    }

    onRegistryClick() {
        // TODO
    }

    setAlertClasses(type) {
        return {
            'alert-success': false,
            'alert-danger': true,
            special: false
        };
    }

}
