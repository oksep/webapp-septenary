import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {ArticleWriteComponent} from "./write/article-write.component";
import {AuthGuard} from "../../auth/auth.guard";
import {ArticleDetailComponent} from "./detail/article-detail.component";
import {ArticleGuard} from "./article.guard";

const routes: Routes = [
	{path: '', redirectTo: 'page/1', pathMatch: 'full'},
	{path: 'page/:page', component: MainComponent, canActivate: [ArticleGuard]},
	{path: 'article/create', component: ArticleWriteComponent, canActivate: [AuthGuard]},
	{path: 'article/modify/:id', component: ArticleWriteComponent, canActivate: [AuthGuard]},
	{path: 'article/:id', component: ArticleDetailComponent},
	{path: 'tag/:tag', component: MainComponent},
	{path: 'category/:category', component: MainComponent},
	{path: 'tag/:tag/:page', component: MainComponent},
	{path: 'category/:category/:page', component: MainComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ArticleRouting {
}
