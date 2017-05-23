import {Directive, Input, Output, ElementRef, Renderer} from '@angular/core';

@Directive({
    selector: "[withelement]",
    host: {
        '(click)': "show()"
    }
})

export class GetEleDirective {

    constructor(private el: ElementRef) {

    }

    show() {
        // console.log(this.el.nativeElement);
        //
        // console.log('height---' + this.el.nativeElement.offsetHeight);
        // console.log('width---' + this.el.nativeElement.offsetWidth);
    }
}