import {AfterViewInit, Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-upload-form',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, AfterViewInit {


    constructor() {
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.initUploadForm()
    }

    initUploadForm() {
        const domain = 'http://assets.septenary.cn/';
        const $ = jQuery;
        $(function () {
            var $key = $('#key');  // file name    eg: the file is image.jpg,but $key='a.jpg', you will upload the file named 'a.jpg'
            var $userfile = $('#userfile');  // the file you selected

            // upload info
            var $selectedFile = $('.selected-file');
            var $progress = $(".progress");
            var $uploadedResult = $('.uploaded-result');

            $("#userfile").change(function () {  // you can ues 'onchange' here to uplpad automatically after select a file
                $uploadedResult.html('');
                var selectedFile = $userfile.val();
                if (selectedFile) {
                    // randomly generate the final file name
                    var ramdomName = Math.random().toString(36).substr(2) + $userfile.val().match(/\.?[^.\/]+$/);
                    $key.val(ramdomName);
                    $selectedFile.html('文件：' + selectedFile);
                } else {
                    return false;
                }
                let el: HTMLFormElement = <HTMLFormElement>document.getElementById("testform");
                var f = new FormData(el);
                $.ajax({
                    url: 'http://upload.qiniu.com/',  // Different bucket zone has different upload url, you can get right url by the browser error massage when uploading a file with wrong upload url.
                    type: 'POST',
                    data: f,
                    processData: false,
                    contentType: false,
                    xhr: () => {
                        let myXhr = $.ajaxSettings.xhr();
                        if (myXhr.upload) {
                            myXhr.upload.addEventListener('progress', function (e) {
                                // console.log(e);
                                if (e.lengthComputable) {
                                    var percent = e.loaded / e.total * 100;
                                    $progress.html('上传：' + e.loaded + "/" + e.total + " bytes. " + percent.toFixed(2) + "%");
                                }
                            }, false);
                        }
                        return myXhr;
                    },
                    success: (res) => {
                        console.log("成功：" + JSON.stringify(res));
                        var str = '<span>已上传：' + res.key + '</span>';
                        if (res.key && res.key.match(/\.(jpg|jpeg|png|gif)$/)) {
                            let src = domain + res.key;
                            str += `<img src="${src}"/>`;
                        }
                        $uploadedResult.html(str);
                    },
                    error: (res) => {
                        console.log("失败:" + JSON.stringify(res));
                        $uploadedResult.html('上传失败：' + res.responseText);
                    }
                });
                return false;
            });
        });
    }

}
