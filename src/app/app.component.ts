import {AfterViewInit, Component, OnInit} from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

const $ = jQuery;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    constructor(private authService: AuthService, private router: Router) {
        $(window).resize(() => this.onWindowSizeChange());
        router.events.subscribe((event: any)=>{
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
        });
    }

    ngOnInit(): void {
        onBootstrap(1000);
    }

    ngAfterViewInit(): void {

    }

    get loggedIn() {
        return this.authService.getLoggedIn();
    }

    get authName() {
        return this.authService.getAuthName();
    }

    onLogoutClick() {
        let loggedIn = this.authService.getLoggedIn();
        if (loggedIn) {
            this.authService.logout();
            this.router.navigateByUrl('');
        } else {
            this.router.navigateByUrl('/user/login');
        }
    }

    onWindowSizeChange() {

    }

}
