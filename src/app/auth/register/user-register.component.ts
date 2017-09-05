import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

class Credentials {
    email: string;
    password: string;
    name: string;

    constructor() {
        this.email = 'seven__up@sina.cn';
        this.password = '123456';
        this.name = "Septenary";
    }
}

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    // styleUrls: ['../login/user-login.component.css']
})
export class UserRegisterComponent implements OnInit {
    credentials = new Credentials(); // 凭证

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    onRegisterSubmit() {
        this.authService.register(this.credentials).subscribe((result) => {
            if (result.success) {
                setTimeout(
                    () => this.router.navigate(['/auth/login'])
                    , 750
                );
            } else {
                // TODO
            }
        });
    }

}
