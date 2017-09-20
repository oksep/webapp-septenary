import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Self, ViewChild} from "@angular/core";
import {OnUploadCallback, UploadService} from "./upload.service";
import {NotificationsService} from "../../notification/simple-notifications/services/notifications.service";
import {ControlValueAccessor, NgModel} from "@angular/forms";

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss'],
	providers: [NgModel]
})
export class UploadComponent implements OnInit, OnUploadCallback, ControlValueAccessor {

	dragging: boolean = false; // 拖动中
	imageLoaded: boolean = false; // 图片加载完成
	uploading: boolean = false; // 正在上传
	uploadProgress: number = 0; // 上传进度

	@Input() fileType: 'image' | 'file' = 'image'; // 文件类型： 图片、普通文件

	@Output() onUploadFile = new EventEmitter(); // 上传完成事件
	@Output() onDeleteFile = new EventEmitter(); // 文件删除

	@ViewChild('fileUpload') fileUpload: ElementRef;

	@Input() enable: boolean = true;

	@Input() keyPrefix: string = 'public';

	@Input() uploadIconClass = 'fa-upload';

	@Input() canDelete = true;

	@Input()
	set fileUrl(url: string) {
		this.writeValue(url);
	}

	_fileUrl: string; // 文件源

	model: NgModel;

	constructor(@Self() model: NgModel,
							private uploadService: UploadService,
							private notificationsService: NotificationsService) {
		this.model = model;
		model.valueAccessor = this;
		this.reset();
	}

	ngOnInit(): void {
		// setInterval(() => {
		// 	this.uploadProgress += 10;
		// 	if (this.uploadProgress > 100) this.uploadProgress = 0;
		// }, 500);
	}

	// 拖动进入
	handleDragEnter() {
		this.dragging = true;
		console.log('Drag enter')
	}

	// 拖动离开
	handleDragLeave() {
		this.dragging = false;
		console.log('Drag leave')
	}

	// 拖动命中
	handleDrop(e: DragEvent) {
		e.preventDefault();
		this.dragging = false;
		this.handleInputChange(e);
	}

	handleImageLoad() {
		this.imageLoaded = true;
	}

	handleInputChange(e: DragEvent) {
		let file = e.dataTransfer ? e.dataTransfer.files[0] : (<HTMLInputElement>e.target).files[0];
		if (file) {
			// this.previewFile(file);
			this.doUpload(file);
		}
	}

	// 文件预览
	previewFile(file: File) {
		if (!file.type.match(/image-*/)) {
			this.notificationsService.error('提示', '请选择正确的文件格式');
			return;
		}
		let reader = new FileReader();
		reader.onload = (e: any) => {
			this._fileUrl = e.target.result;
		};
		reader.readAsDataURL(file);
	}

	// 上传进度
	onUploadProgress(percent: number): void {
		this.uploadProgress = 100 * percent;
	}

	// 上传失败
	onUploadError(err) {
		this.notificationsService.error('图片上传失败');
		this.reset();
	}

	// 上传完成回调
	onUploadComplete(url: string) {
		this.notificationsService.success('图片上传成功', url);
		this.reset();
		this.onChange(url);
		this.onUploadFile.next(url);
	}

	onLoaded() {
		// nothing
	}

	// 上传文件
	doUpload(file: File) {
		if (file) {
			this.uploading = true;
			let key = this.keyPrefix + '/' + this.fileType + '/' + this.uploadService.generateUUID();
			this.uploadService.uploadFile(key, file, this);
		}
	}

	// 重置
	reset() {
		this._fileUrl = null;
		this.uploading = false;
		this.uploadProgress = 0;
		this.fileUpload && (this.fileUpload.nativeElement.value = "");
	}

	// 删除文件
	onDeleteClick(event: Event) {
		if (window.confirm('确定要删除该文件吗?')) {
			event.preventDefault();
			this.reset();
			this.onChange(null);
			this.onDeleteFile.next();
		}
	}

	// 复制文件超链接
	onCopyFileUrlClick() {
		let $temp = jQuery("<input>");
		jQuery("body").append($temp);
		$temp.val(this._fileUrl).select();
		document.execCommand("copy");
		$temp.remove();
		this.notificationsService.info('提示', '已复制成功到剪切板');
	}

	onRequestSelect() {
		if (!this._fileUrl || this.enable) {
			this.fileUpload.nativeElement.click();
		} else {
			this.onCopyFileUrlClick();
		}
	}

	public onChange = (value: any) => {
	};

	public onTouch = (value: any) => {
	};

	public writeValue(fileUrl: string): void {
		this._fileUrl = fileUrl;
	}

	public registerOnChange(fn: any): void {
		this.onChange = function (fileUrl: string) {
			this.writeValue(fileUrl);
			this.model.viewToModelUpdate(fileUrl);
			this.model.control.setValue(fileUrl);
			this.model.control.markAsDirty(false);
		};
	}

	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

}
