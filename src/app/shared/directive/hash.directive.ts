import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
    selector: '[hashfor]'
})
export class HashDirective {

    constructor(private el: ElementRef) {
    }

    @Input('hashfor') destination: string;

    @HostListener('click') onClick() {
        window.location.hash = this.destination;
    }

}