import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
	selector: "[inputLengthCounter]",
})

export class InputLengthCounterDirective implements OnInit {
	id: string = 'inputLengthCounter_' + Math.random().toString(36).substring(7);
	text: string;

	constructor(private elementRef: ElementRef, private renderer: Renderer2) {
	}

	@Input()
	set inputLengthCounterText(text: string) {
		text = String(text);
		this.text = text;
		let selector: string = '#' + this.id;
		let el = (<HTMLInputElement>this.elementRef.nativeElement).parentElement.querySelector(selector);
		if (el) {
			el.innerHTML = (text ? text.length : 0) + ' / ' + (<HTMLInputElement>this.elementRef.nativeElement).maxLength;
		}
	}

	ngOnInit() {
		let child = this.renderer.createElement("div");
		this.renderer.setStyle(child, 'text-align', 'right');
		this.renderer.setStyle(child, 'margin-top', '0.25rem');
		this.renderer.setStyle(child, 'height', '1rem');
		this.renderer.setStyle(child, 'color', '#888888');
		this.renderer.setProperty(child, 'id', this.id);
		this.renderer.appendChild(this.elementRef.nativeElement.parentElement, child);
		this.inputLengthCounterText = this.text;
	}
}