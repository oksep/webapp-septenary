import {Component, Input, Self, ViewChild} from "@angular/core";
import {ControlValueAccessor, NgModel} from '@angular/forms';
import {UploadComponent} from "./upload.component";

@Component({
	selector: 'app-upload-group',
	templateUrl: './upload-group.component.html',
	providers: [NgModel],
})
export class UploadGroupComponent implements ControlValueAccessor {

	@ViewChild('addButton') addButton: UploadComponent;
	_urlList: string[] = [];
	model: NgModel;
	@Input() keyPrefix: string = 'public/';

	@Input()
	set urlList(value: string[]) {
		this.writeValue(value);
	}

	constructor(@Self() model: NgModel) {
		this.model = model;
		model.valueAccessor = this;
	}

	onFileDelete(index) {
		this._urlList.splice(index, 1);
		this.onChange(this._urlList);
	}

	onFileAdd(fileUrl: string) {
		this._urlList.push(fileUrl);
		this.onChange(this._urlList);
		this.addButton.reset();
	}

	getUrlList() {
		return this._urlList;
	}

	public onChange = (value: any) => {
	};

	public onTouch = (value: any) => {
	};

	public writeValue(value: string[]): void {
		this._urlList = value ? value : [];
	}

	public registerOnChange(fn: any): void {
		this.onChange = function (value: string[]) {
			this.writeValue(value);
			this.model.viewToModelUpdate(value);
			this.model.control.setValue(value);
			this.model.control.markAsDirty(false);
		};
	}

	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}
}