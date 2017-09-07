import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {AuthEvent, AuthService} from "../../auth/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {User} from "../../model/user";
import {Subscription} from "rxjs/Subscription";
// import {User} from "../model/user";

// const $ = jQuery;

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

	headerIsHollow: boolean;

	loginUser: User;

	constructor(private authService: AuthService,
							private router: Router) {
		// $(window).resize(() => this.onWindowSizeChange());
	}

	routerSub: Subscription;

	currentUrl: string;

	ngOnInit(): void {
		this.authService.events.subscribe((event: AuthEvent) => {
			this.loginUser = event ? event.loginUser : null;
		});

		this.authService.ensureLoggedIn();

		this.currentUrl = this.router.url;
		this.routerSub = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.currentUrl = event.urlAfterRedirects;
			}
		})
	}

	ngOnDestroy() {
		this.routerSub.unsubscribe();
	}

	ngAfterViewInit(): void {
		// const nav = jQuery('.nav-header');
		// jQuery(document).scroll(function () {
		// 	nav.toggleClass('pinned', $(this).scrollTop() > nav.height());
		// });
	}

	get loggedIn() {
		return this.loginUser != null;
	}

	get authAvatar() {
		return this.loginUser ? this.loginUser.avatar : null;
	}

	onLogoutClick() {
		this.authService.logout();
		this.router.navigateByUrl('/');
	}

	isActive(prefix: string, defaultActive: boolean = false): boolean {
		if (!!this.currentUrl) {
			return this.currentUrl.startsWith(prefix);
		} else {
			return defaultActive;
		}
	}


}
