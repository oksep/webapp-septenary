import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
// module
// pipe
import {AwesomePipe} from "./pipe/awesome.pipe";
// directive
import {HighlightDirective} from "./directive/highlight.directive";
import {GetEleDirective} from "./directive/get-el.directive";
// component
import {MarkdownComponent} from "./component/mdeditor.component";
import {PageNotFoundComponent} from "./component/404.component";
import {StaticsComponent} from "../widget/statics/statics.component";
import {TagsComponent} from "../widget/tags/tags.component";
import {SummaryPipe} from "./pipe/summary.pipe";
import {ArticleDatePipe} from "./pipe/date.pipe";

// service
// import {UserService} from "../user/user.service";

@NgModule({
    imports: [
        CommonModule,
        // ColorPickerModule,
    ],
    declarations: [
        AwesomePipe,
        SummaryPipe,
        ArticleDatePipe,
        HighlightDirective,
        GetEleDirective,
        MarkdownComponent,
        StaticsComponent,
        TagsComponent,
        PageNotFoundComponent,
    ],
    exports: [
        AwesomePipe,
        SummaryPipe,
        ArticleDatePipe,
        HighlightDirective,
        GetEleDirective,
        MarkdownComponent,
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