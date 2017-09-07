import {AfterViewInit, Component} from "@angular/core";

@Component({
	template: `
      <div class="row justify-content-center mt-5 mb-5">
          <div>
              <p class="text-center" style="color: #f94257; font-size: 1.75rem;">404 Page Not Found</p>
              <img src="http://ryfthink.github.io/imgs/404.jpg" alt="404">
          </div>
      </div>
	`,
})
export class PageNotFoundComponent implements AfterViewInit {
	constructor() {

	}

	ngAfterViewInit(): void {
	}
}