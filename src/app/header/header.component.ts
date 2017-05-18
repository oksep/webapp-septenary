import {AfterViewInit, Component, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {HeaderEvent, HeaderService} from "./header.service";

const $ = jQuery;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

    headerAbsolute: boolean;

    constructor(private headerService: HeaderService, private authService: AuthService, private router: Router) {
        $(window).resize(() => this.onWindowSizeChange());
    }

    ngOnInit(): void {
        this.headerService.events.subscribe((event: HeaderEvent) => {
            this.headerAbsolute = event.isAbsolute;
        });
    }

    ngAfterViewInit(): void {
        const nav = jQuery('.nav-header');
        jQuery(document).scroll(function () {
            nav.toggleClass('pinned', $(this).scrollTop() > nav.height());
        });
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
