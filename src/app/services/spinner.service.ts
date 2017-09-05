import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable()
export class SpinnerService {

	private _selector: string = 'preloader';
	private _element: HTMLElement;

	constructor(@Inject(DOCUMENT) private document: any) {
		this._element = document.getElementById(this._selector);
	}

	public show(): void {
		// this._element.style['display'] = 'block';
	}

	public hide(delay: number = 1000): void {
		setTimeout(
			function removeLoadingScreen() {
				// let preBootstrapContainer = this.document.getElementById("pre-bootstrap-container");
				let preBootstrap = this.document.getElementById("pre-bootstrap");
				preBootstrap.className = "loaded";
				setTimeout(function () {
					// preBootstrapContainer.parentNode.removeChild(preBootstrapContainer);
					preBootstrap.parentElement.removeChild(preBootstrap);
				}, 300);
			},
			delay
		);
	}
}
