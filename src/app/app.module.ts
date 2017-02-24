import './rxjs-extensions';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// fake backend
import {MockBackendFactory} from "./helper/mock-backend";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http} from "@angular/http";

// component
import {AppComponent} from './app.component';

// service
import {AuthService} from './core/auth.service';

/* Feature Modules */
import {HomeModule}    from './home/home.module';
import {CoreModule}       from './core/core.module';

/* Routing Module */
import {AppRoutingModule} from './app-routing.module';
import {SharedModule}       from './shared/shared.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HomeModule,
        CoreModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [
        AuthService,

        // providers used to create fake backend
        MockBackend,
        BaseRequestOptions,
        {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: MockBackendFactory.obtain
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
