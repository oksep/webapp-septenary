import {AfterViewInit, Component, OnInit} from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {NavigationEnd, Router} from "@angular/router";

const $ = jQuery;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    notificationOptions = {
        timeOut: 1500,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        position: ["top", "right"]
    };

    constructor(private authService: AuthService, private router: Router) {
        $(window).resize(() => this.onWindowSizeChange());
        router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
            // NavigationStart
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

    onWindowSizeChange() {

    }

}
