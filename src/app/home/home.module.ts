import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";

import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home.routing";

import {AuthGuard} from "../auth/auth.guard";

import {TagInputModule} from "ng2-tag-input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ArticleModule} from "../article/article.module";

@NgModule({
    imports: [
        SharedModule,
        ArticleModule,
        HomeRoutingModule,
        TagInputModule,
        BrowserAnimationsModule
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [
        AuthGuard
    ]
})
export class HomeModule {
}
