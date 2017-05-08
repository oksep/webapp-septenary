import { Component, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';

@Component({
    selector: 'mdeditor',
    template: '<textarea #simplemde>{{text}}</textarea>',
})
export class MarkdownComponent implements AfterViewInit {
    @ViewChild('simplemde') textarea : ElementRef;

    @Input() text: string;

    ngAfterViewInit() {
        const mde = new SimpleMDE({
            element: this.textarea.nativeElement,
            showIcons: ["code", "table"]
        });

        setTimeout(()=>{
            console.log('Value', mde.value());
        },2000);
    }
}