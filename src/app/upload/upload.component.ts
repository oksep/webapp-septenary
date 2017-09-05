import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {OnUploadCallback, UploadService} from "./upload.service";
import {NotificationsService} from "../notification/simple-notifications/services/notifications.service";

@Component({
    selector: 'app-upload-form',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnUploadCallback {
    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    imageSrc: string = '';

    uploading: boolean = false;
    uploadProgress: number = 0;

    file: File = null;

    @Input() key: string;
    @Input() keyPrefix: string = 'public/';
    @Output() onSelectFile = new EventEmitter();

    @Input() autoUpload: boolean = true;
    @Output() onUploadFile = new EventEmitter();

    constructor(private uploadService: UploadService,
                private notificationsService: NotificationsService) {
    }

    ngOnInit(): void {

    }

    handleDragEnter() {
        this.dragging = true;
        console.log('Drag enter')
    }

    handleDragLeave() {
        this.dragging = false;
        console.log('Drag leave')
    }

    handleDrop(e: DragEvent) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }

    handleImageLoad() {
        this.imageLoaded = true;
    }

    handleInputChange(e) {
        let eventFile = this.getEventFile(e);
        if (!eventFile) {
            return
        }
        this.file = eventFile;
        let pattern = /image-*/;
        let reader = new FileReader();
        if (!this.file.type.match(pattern)) {
            alert('Invalid format !!!');
            return;
        }
        this.loaded = false;
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(this.file);

        this.onSelectFile.next(this.file);

        this.autoUpload && this.doUpload(this.file);
    }

    _handleReaderLoaded(e) {
        let reader = e.target;
        this.imageSrc = reader.result;
        this.loaded = true;
    }

    onUploadProgress(percent: number): void {
        this.uploadProgress = 100 * percent;
    }

    onUploadError(err) {
        this.notificationsService.warn('图片上传失败');
        this.uploading = false;
    }

    onUploadComplete() {
        this.notificationsService.success('图片上传成功');
        this.uploading = false;
        this.onUploadFile.next('');
    }

    onLoaded(result: Object) {
        console.warn('上传完成', result);
    }


    doUpload(file: File) {
        if (this.file) {
            this.uploading = true;
            if (!this.key) {
                this.key = this.keyPrefix + Math.random().toString(36).substr(2) //+ this.file.name.match(/\.?[^.\/]+$/);
            }
            this.uploadService.uploadFile(this.key, this.file, this);
        }
    }

    private getEventFile(event: DragEvent) {
        return event.dataTransfer ? event.dataTransfer.files[0] : (<HTMLInputElement>event.target).files[0];
    }

}
