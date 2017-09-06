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
import {BounceSpinnerComponent} from './components/bounce-spinner/bounce-spinner.component';
import {UploadComponent} from "./upload/upload.component";
import {UploadService} from "./upload/upload.service";
import {UploadGroupComponent} from "./upload/upload-group.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
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
		BounceSpinnerComponent,
		UploadComponent,
		UploadGroupComponent
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
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
		UploadComponent,
		UploadGroupComponent,
	],
	providers: [
		UploadService
	]
})
export class SharedModule {
}