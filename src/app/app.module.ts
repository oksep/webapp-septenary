import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AppTranslationModule} from './translation.module';
import {SimpleNotificationsModule} from "./notification/simple-notifications.module";
import {SlimLoadingBarModule} from "./loading/slim-loading-bar.module";
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app.routing";
import {AuthModule} from "./auth/auth.module";
import {GlobalState} from "./services/global.state";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HomeModule} from "./home/home.module";

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		SharedModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppTranslationModule,
		HttpModule,
		RouterModule,
		SimpleNotificationsModule.forRoot(),
		SlimLoadingBarModule.forRoot(),
		AppRoutingModule,
		AuthModule,
		HomeModule
	],
	providers: [
		GlobalState
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
