import {Pipe, PipeTransform} from '@angular/core';

const QINIU_IMG_DOMAIN = 'http://assets.septenary.cn';
const QINIU_IMG_SIZES = {
	'sm': '?imageView2/1/w/150/h/120/q/75|imageslim',
	'md': '?imageMogr2/auto-orient/thumbnail/800x/blur/1x0/quality/75|imageslim',
	'lg': ''
};

@Pipe({
	name: 'qiniuImg'
})
export class QiniuImgPipe implements PipeTransform {

	transform(value: string, args?: 'sm' | 'md' | 'lg'): any {
		if (!args) args = 'md';
		let size = QINIU_IMG_SIZES[args];
		return value && size && value.startsWith(QINIU_IMG_DOMAIN) ? value + size: value;
	}

}
