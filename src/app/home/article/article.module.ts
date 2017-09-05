import {NgModule} from "@angular/core";

import {RouterModule} from "@angular/router";
// module
import {SharedModule} from "../../shared/shared.module";
// import {MarkdownModule} from "angular2-markdown";
import {MarkdownModule} from "../../markdown/markdown.module";
// component
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
import {ArticleDetailComponent} from "./detail/article-detail.component";
import {ArticleWriteComponent} from "./write/article-write.component";
import {UploadModule} from "../../upload/upload.module";
import {TagInputModule} from "ng2-tag-input";
import {MainComponent} from './main.component';
import {StaticsComponent} from "./statics/statics.component";
import {ArticleRouting} from "./article.routing";

@NgModule({
	imports: [
		RouterModule,
		SharedModule,
		TagInputModule,
		UploadModule,
		MarkdownModule.forRoot(),
		ArticleRouting,
	],
	declarations: [
		ArticleDetailComponent,
		ArticleListComponent,
		ArticleWriteComponent,
		ArticleComponent,
		ArticleSectionComponent,
		ArticleTocComponent,
		ArticleTagComponent,
		TagsComponent,
		MainComponent,
		StaticsComponent
	],
	exports: [
		ArticleDetailComponent,
		ArticleListComponent,
		ArticleWriteComponent,
		ArticleComponent,
		ArticleTocComponent,
		ArticleSectionComponent,
		ArticleTagComponent,
		TagsComponent,
		StaticsComponent
	],
	providers: [
		ArticleService,
		ArticleGuard
	]
})
export class ArticleModule {
}