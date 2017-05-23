/* tslint:disable */
// Exact copy of contact/highlight.directive except for color and message
import {Directive, ElementRef, HostListener, Input, Renderer2} from "@angular/core";

@Directive({selector: '[highlight]'})
/** Highlight the attached element or an InputElement in gray */
export class HighlightDirective {

    _defaultColor = '#f0f0f0';

    constructor(private renderer: Renderer2, private el: ElementRef) {
        renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
        // renderer.setElementStyle(el.nativeElement, 'background-color', 'lightgray');
        // console.log(`* Shared highlight called for ${el.nativeElement.tagName}`);
    }

    @Input('highlight') highlightColor: string;

    @HostListener('mouseenter') onMouseEnter() {
        this.toggleHighlightColor(this.highlightColor || this._defaultColor);
        this.renderer.removeClass(this.el.nativeElement, 'nav-link');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.toggleHighlightColor(null);
        this.renderer.addClass(this.el.nativeElement, 'nav-link');
    }

    private toggleHighlightColor(color) {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    }
}