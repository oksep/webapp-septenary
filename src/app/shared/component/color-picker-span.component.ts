import {AfterViewInit, Component} from "@angular/core";

@Component({
    selector: 'color-picker-span',
    template: `
        <span [(colorPicker)]="color"
              [cpPosition]="'bottom'"
              [style.color]="color"
              [cpPositionOffset]="'50%'"
              [cpPositionRelativeToArrow]="true">ColorPicker!</span>
    `,
})
export class ColorPickerSpanComponent implements AfterViewInit {

    color = '#FFF';

    ngAfterViewInit(): void {
    }

    constructor() {

    }
}