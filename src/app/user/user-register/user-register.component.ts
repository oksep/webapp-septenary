import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

class Credentials {
    email: string;
    password: string;

    constructor() {
        this.email = 'seven__up@sina.cn';
        this.password = '123456';
    }
}

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
    credentials = new Credentials(); // 凭证
    alertMessage = "新用户注册";
    alertType = 'info';

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    onRegisterSubmit() {
        this.authService.register(this.credentials).subscribe((result) => {
            if (result.success) {
                this.alertMessage = '注册成功';
                this.alertType = 'info';
                setTimeout(
                    () => this.router.navigate(['/user/login'])
                    , 750
                );
            } else {
                this.alertMessage = result.error.message;
                this.alertType = 'danger';
            }
        });
    }

    setAlertClasses(type) {
        return {
            'alert-danger': this.alertType == 'danger',
            'alert-info': this.alertType != 'danger'
        };
    }
}
