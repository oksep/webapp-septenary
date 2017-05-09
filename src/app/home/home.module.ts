import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";

import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home.routing";
import {PostWriteComponent} from "../post/write/post-write.component";
import {PostDetailComponent} from "../post/detail/post-detail.component";
import {PostListComponent} from "../post/list/post-list.component";
import {PostService} from "../post/post.service";

import {AuthGuard} from "../auth/auth.guard";
import {PostGuard} from '../post/post.guard';

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
        PostDetailComponent,
        PostListComponent,
        PostWriteComponent
    ],
    providers: [
        PostService,
        AuthGuard,
        PostGuard
    ]
})
export class HomeModule {
}
