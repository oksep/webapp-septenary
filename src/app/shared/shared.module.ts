import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
// pipe
import {AwesomePipe} from "./pipe/awesome.pipe";
// directive
import {HighlightDirective} from "./directive/highlight.directive";
import {GetEleDirective} from "./directive/get-el.directive";
// component
import {MDEditor} from "./component/mdeditor.component";

import {StaticsComponent} from "../widget/statics/statics.component";
import {TagsComponent} from "../widget/tags/tags.component";
// service
// import {UserService} from "../user/user.service";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AwesomePipe,
        HighlightDirective,
        GetEleDirective,
        MDEditor,
        StaticsComponent,
        TagsComponent
    ],
    exports: [
        AwesomePipe,
        HighlightDirective,
        GetEleDirective,
        MDEditor,
        CommonModule,
        FormsModule,
        StaticsComponent,
        TagsComponent,
    ],
    providers: [
        // UserService
    ]
})
export class SharedModule {
}