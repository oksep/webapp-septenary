import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {RouterModule} from "@angular/router";

// module
import {SharedModule} from "../shared/shared.module";
// import {MarkdownModule} from "angular2-markdown";
import {MarkdownModule} from "../markdown/markdown.module";
import {TagInputModule} from "ng2-tag-input";
import {Ng2PageScrollModule} from "ng2-page-scroll";

// component
import {ArticleDetailComponent} from "app/article/detail/article-detail.component";
import {ArticleWriteComponent} from "app/article/write/article-write.component";
import {ArticleListComponent} from "./list/article-list.component";
import {ArticleComponent} from "./header/article-header.component";
import {ArticleSectionComponent} from "./list/section/article-section.component";
import {ArticleTagComponent} from "./tag/article-tag.component";
import {ArticleTocComponent} from "./detail/toc/toc.component";
import {TagsComponent} from "./tag-cloud/tag-cloud.component";

// service
import {ArticleService} from "./article.service";

// guard
import {ArticleGuard} from "./article.guard";
import {UploadModule} from "../upload/upload.module";


@NgModule({
    imports: [
        RouterModule,
        SharedModule,
        TagInputModule,
        BrowserAnimationsModule,
        UploadModule,
        MarkdownModule.forRoot(),
        Ng2PageScrollModule.forRoot(),
    ],
    declarations: [
        ArticleDetailComponent,
        ArticleListComponent,
        ArticleWriteComponent,
        ArticleComponent,
        ArticleSectionComponent,
        ArticleTocComponent,
        ArticleTagComponent,
        TagsComponent
    ],
    exports: [
        ArticleDetailComponent,
        ArticleListComponent,
        ArticleWriteComponent,
        ArticleComponent,
        ArticleTocComponent,
        ArticleSectionComponent,
        ArticleTagComponent,
        TagsComponent
    ],
    providers: [
        ArticleService,
        ArticleGuard
    ]
})
export class ArticleModule {
}
