import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    toggle = true;

    constructor() {
        window.onscroll = this.onWindowScroll;
    }

    ngOnInit() {
    }

    onWindowScroll() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            if (!this.toggle) {
                this.toggle = !this.toggle;
                jQuery('#app-header').addClass('app-header-primary');
            }
        } else {
            if (this.toggle) {
                this.toggle = !this.toggle;
                jQuery('#app-header').removeClass('app-header-primary');
            }
        }
    }

}
