import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

	transform(time: number, args?: any): string {
		if (!time) return '-';

		let nowTime = Math.round((new Date()).getTime() / 1000);
		let dif = nowTime - Math.round((new Date(time)).getTime() / 1000);

		if (dif < 0) {
			dif = 0;
		}
		let result = '';
		if (dif >= 365 * 24 * 3600) {
			result = Math.round(dif / (365 * 24 * 3600)) + '年前';
		} else if (dif >= 30 * 24 * 3600) {
			result = Math.round(dif / (30 * 24 * 3600)) + '个月前';
		} else if (dif >= 24 * 3600) {
			result = Math.round(dif / (24 * 3600)) + '天前';
		} else if (dif >= 3600) {
			result = Math.round(dif / 3600) + '小时前';
		} else if (dif >= 60) {
			result = Math.round(dif / 60) + '分钟前';
		} else {
			result = dif + '秒前';
		}
		return result;
	}
}