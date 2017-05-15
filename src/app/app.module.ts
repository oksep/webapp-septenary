import "./rxjs-extensions";

import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {HttpModule} from "@angular/http";

import {SharedModule} from "./shared/shared.module";

import {HomeModule} from "./home/home.module";

import {AppRoutingModule} from "./app.routing";
// module
import {AuthModule} from "./auth/auth.module";
// component
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {HeaderService} from "./header/header.service";
import {FooterComponent} from "./footer/footer.component";

// service

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule,
        HttpModule,
        HomeModule,
        AuthModule
    ],
    providers: [
        HeaderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
