import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {PostDetailComponent} from "./detail/post-detail.component";
import {PostListComponent} from "./list/post-list.component";

const routes: Routes = [
    {path: '', redirectTo: 'page/1', pathMatch: 'full'},
    {path: 'page/:page', component: PostListComponent},
    {path: 'detail/:postId', component: PostDetailComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule {
}