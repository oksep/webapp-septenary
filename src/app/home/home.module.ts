import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";

import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home.routing";
import {ArticleWriteComponent} from "../article/write/article-write.component";
import {ArticleDetailComponent} from "../article/detail/article-detail.component";
import {ArticleListComponent} from "../article/list/article-list.component";
import {ArticleService} from "../article/article.service";

import {AuthGuard} from "../auth/auth.guard";
import {ArticleGuard} from '../article/article.guard';

import { TagInputModule } from 'ng2-tag-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        SharedModule,
        HomeRoutingModule,
        TagInputModule,
        BrowserAnimationsModule
    ],
    declarations: [
        HomeComponent,
        ArticleDetailComponent,
        ArticleListComponent,
        ArticleWriteComponent
    ],
    providers: [
        ArticleService,
        AuthGuard,
        ArticleGuard
    ]
})
export class HomeModule {
}
