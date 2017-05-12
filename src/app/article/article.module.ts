import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";

import {TagInputModule} from "ng2-tag-input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ArticleDetailComponent} from "app/article/detail/article-detail.component";
import {ArticleWriteComponent} from "app/article/write/article-write.component";
import {ArticleListComponent} from "./list/article-list.component";
import {ArticleService} from "./article.service";
import {ArticleGuard} from "./article.guard";

@NgModule({
    imports: [
        SharedModule,
        TagInputModule,
        BrowserAnimationsModule
    ],
    declarations: [
        ArticleDetailComponent,
        ArticleListComponent,
        ArticleWriteComponent
    ],
    exports: [
        ArticleDetailComponent,
        ArticleListComponent,
        ArticleWriteComponent
    ],
    providers: [
        ArticleService,
        ArticleGuard
    ]
})
export class ArticleModule {
}
