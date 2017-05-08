import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home.component";
import {PostWriteComponent} from "../post/write/post-write.component";
import {PostDetailComponent} from "../post/detail/post-detail.component";
import {PostListComponent} from "../post/list/post-list.component";

import {PageNotFoundComponent} from "../shared/component/404.component";

import {AuthGuard} from "../auth/auth.guard";
import {PostGuard} from '../post/post.guard';

const routes: Routes = [
    // {path: '', redirectTo: 'post', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'page/:page', component: PostListComponent, canActivate: [PostGuard]},
    {path: 'write', component: PostWriteComponent, canActivate: [AuthGuard]},
    {path: 'detail/:id', component: PostDetailComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
