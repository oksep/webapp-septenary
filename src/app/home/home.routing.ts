import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home.component";
import {ArticleWriteComponent} from "../article/write/article-write.component";
import {ArticleDetailComponent} from "../article/detail/article-detail.component";
import {ArticleListComponent} from "../article/list/article-list.component";

import {PageNotFoundComponent} from "../shared/component/404.component";

import {AuthGuard} from "../auth/auth.guard";
import {ArticleGuard} from "../article/article.guard";

const routes: Routes = [
    // {path: '', redirectTo: 'article', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'page/:page', component: HomeComponent, canActivate: [ArticleGuard]},
    {path: 'article/create', component: ArticleWriteComponent, canActivate: [AuthGuard]},
    {path: 'article/modify/:id', component: ArticleWriteComponent, canActivate: [AuthGuard]},
    {path: 'article/:id', component: ArticleDetailComponent},
    {path: 'tag/:tag', component: HomeComponent},
    {path: 'category/:category', component: HomeComponent},
    {path: 'tag/:tag/:page', component: HomeComponent},
    {path: 'category/:category/:page', component: HomeComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
