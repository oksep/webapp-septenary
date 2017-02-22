import './rxjs-extensions';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

// fake backend
import {backendFactory} from "./helper/mock-backend";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http} from "@angular/http";

// component
import {AppComponent} from './app.component';

// service
import {AuthService} from './auth/auth.service';

/* Feature Modules */
import {HomeModule}    from './home/home.module';
import {CoreModule}       from './core/core.module';

/* Routing Module */
import {AppRoutingModule} from './app-routing.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HomeModule,
        CoreModule,
        AppRoutingModule
    ],
    providers: [
        AuthService,

        // providers used to create fake backend
        MockBackend,
        BaseRequestOptions,
        {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: backendFactory
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
