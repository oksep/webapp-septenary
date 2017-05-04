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
    alertMessage = "欢迎回来";
    isLogging = false;
    alertType = 'info';

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
                this.alertType = 'danger';
                this.alertMessage = result.description;
            }
        });
    }

    onRegistryClick() {
        // TODO
    }

    setAlertClasses(type) {
        return {
            'alert-danger': this.alertType == 'danger',
            'alert-info': this.alertType != 'danger'
        };
    }

}
