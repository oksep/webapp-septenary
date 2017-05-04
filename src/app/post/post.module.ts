import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {PostDetailComponent} from "./detail/post-detail.component";
import {PostListComponent} from "./list/post-list.component";

import {PostRoutingModule} from "./post.routing";
import {PostService} from "./post.service";

@NgModule({
    imports: [
        CommonModule,
        PostRoutingModule
    ],
    declarations: [
        PostDetailComponent,
        PostListComponent
    ],
    providers: [
        PostService
    ]
})
export class PostModule {
}
