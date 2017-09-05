import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';

// import * as jQuery from 'jquery';

@Component({
	selector: 'app-back-top',
	templateUrl: './back-top.component.html',
	styleUrls: ['./back-top.component.scss']
})
export class BackTopComponent implements AfterViewInit {

	@Input() position: number = 400;
	@Input() showSpeed: number = 500;
	@Input() moveSpeed: number = 200;

	@ViewChild('backTop') _selector: ElementRef;

	ngAfterViewInit() {
		this._onWindowScroll();
	}

	@HostListener('click')
	_onClick(): boolean {
		jQuery('html, body').animate({scrollTop: 0}, {duration: this.moveSpeed});
		return false;
	}

	@HostListener('window:scroll')
	_onWindowScroll(): void {
		let el = this._selector.nativeElement;
		window.scrollY > this.position ? jQuery(el).fadeIn(this.showSpeed) : jQuery(el).fadeOut(this.showSpeed);
	}
}

