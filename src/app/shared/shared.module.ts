import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule}         from '@angular/forms';

// pipe
import {AwesomePipe}         from './awesome.pipe';

// directive
import {HighlightDirective}  from './highlight.directive';
import {GetEleDirective} from './get-el.directive';

// component
import {MDEditor} from './mdeditor.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        AwesomePipe,
        HighlightDirective,
        GetEleDirective,
        MDEditor
    ],
    exports: [
        AwesomePipe,
        HighlightDirective,
        GetEleDirective,
        MDEditor,
        CommonModule,
        FormsModule
    ]
})
export class SharedModule {
}