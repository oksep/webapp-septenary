import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {UploadService} from "./upload.service";
import {UploadComponent} from "./upload.component";

@NgModule({
    imports: [CommonModule, HttpModule],
    declarations: [UploadComponent],
    providers: [UploadService],
    exports: [UploadComponent]
})
export class UploadModule {
}
