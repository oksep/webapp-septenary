import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
// module
import {ColorPickerModule} from "./module/color-picker/color-picker.module";
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
import {ColorPickerSpanComponent} from "./component/color-picker-span.component";

// service
// import {UserService} from "../user/user.service";

@NgModule({
    imports: [
        CommonModule,
        ColorPickerModule,
    ],
    declarations: [
        AwesomePipe,
        HighlightDirective,
        GetEleDirective,
        MarkdownComponent,
        StaticsComponent,
        TagsComponent,
        PageNotFoundComponent,
        ColorPickerSpanComponent
    ],
    exports: [
        AwesomePipe,
        HighlightDirective,
        GetEleDirective,
        MarkdownComponent,
        CommonModule,
        FormsModule,
        ColorPickerSpanComponent,
        StaticsComponent,
        TagsComponent,
    ],
    providers: [
        // UserService
    ]
})
export class SharedModule {
}