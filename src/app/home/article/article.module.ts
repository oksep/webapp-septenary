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
import {TagInputModule} from "ng2-tag-input";
import {MainComponent} from './main.component';
import {StatisticsComponent} from "./statistics/statistics.component";
import {ArticleRouting} from "./article.routing";
import {EditArticleGuard} from "./write/guard";

@NgModule({
	imports: [
		RouterModule,
		SharedModule,
		TagInputModule,
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
		StatisticsComponent
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
		StatisticsComponent
	],
	providers: [
		ArticleService,
		ArticleGuard,
		EditArticleGuard
	]
})
export class ArticleModule {
}
