import "./rxjs-extensions";

import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {HttpModule} from "@angular/http";

import {SharedModule} from "./shared/shared.module";

import {HomeModule} from "./home/home.module";

import {AppRoutingModule} from './app.routing';

// module
import {AuthModule} from "./auth/auth.module";

// component
import {AppComponent} from "./app.component";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        HttpModule,
        HomeModule,
        AuthModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
