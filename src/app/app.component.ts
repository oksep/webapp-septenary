import {AfterViewInit, Component, OnInit} from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

const $ = jQuery;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    constructor(private authService: AuthService, private router: Router) {
        $(window).resize(() => this.onWindowSizeChange());
    }

    ngOnInit(): void {
        onBootstrap(1000);
        // this.isLogin = this.userService.isLoginUser()
    }

    ngAfterViewInit(): void {

    }

    getLoggedIn() {
        return this.authService.getLoggedIn();
    }

    onLogButtonClick() {
        let loggedIn = this.authService.getLoggedIn();
        if (loggedIn) {
            this.authService.logout();
        } else {
            this.router.navigateByUrl('/user/login');
        }
    }

    onWindowSizeChange() {

    }
}
