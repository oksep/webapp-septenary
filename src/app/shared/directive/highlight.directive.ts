/* tslint:disable */
// Exact copy of contact/highlight.directive except for color and message
import {Directive, ElementRef, Renderer, Input, HostListener} from '@angular/core';

@Directive({selector: '[highlight], input, [highlightColor]'})
/** Highlight the attached element or an InputElement in gray */
export class HighlightDirective {

    _defaultColor = '#f0f0f0'

    constructor(private renderer: Renderer, private el: ElementRef) {
        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'lightgray');
        console.log(
            `* Shared highlight called for ${el.nativeElement.tagName}`);
    }

    @Input('highlightColor') highlightColor: string;

    @HostListener('mouseenter') onMouseEnter() {
        this.toggleHighlightColor(this.highlightColor || this._defaultColor);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.toggleHighlightColor(null);
    }

    private toggleHighlightColor(color) {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    }
}