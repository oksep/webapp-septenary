import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DateFormatPipe} from "./pipes/date-format.pipe";
import {FileSizePipe} from "./pipes/file-size.pipe";
import {SanitizeHtmlPipe} from "./pipes/sanitize-html.pipe";
import {SpentTimePipe} from "./pipes/spent-time.pipe";
import {SummaryPipe} from "./pipes/summary.pipe";
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {ToStringPipe} from "./pipes/to-string.pipe";
import {ParticleGroundComponent} from './components/particle-ground/particle-ground.component';
import {BackTopComponent} from './components/back-top/back-top.component';
import {ScrollPositionDirective} from "./directives/scroll-position.directive";
import {InputLengthCounterDirective} from "./directives/input-length-counter.directive";

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		DateFormatPipe,
		FileSizePipe,
		SanitizeHtmlPipe,
		SpentTimePipe,
		SummaryPipe,
		TimeAgoPipe,
		ToStringPipe,
		InputLengthCounterDirective,
		ScrollPositionDirective,
		ParticleGroundComponent,
		BackTopComponent,
	],
	exports: [
		DateFormatPipe,
		FileSizePipe,
		SanitizeHtmlPipe,
		SpentTimePipe,
		SummaryPipe,
		TimeAgoPipe,
		ToStringPipe,
		InputLengthCounterDirective,
		ScrollPositionDirective,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ParticleGroundComponent,
		BackTopComponent
	],
	providers: []
})
export class SharedModule {
}