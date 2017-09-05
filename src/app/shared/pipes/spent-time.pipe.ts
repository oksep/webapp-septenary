import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'spentTime'
})
export class SpentTimePipe implements PipeTransform {

	transform(minutes: number, args?: any): any {
		let str = '';
		if (minutes >= 1440) { // 一天
			str += Math.floor(minutes / 1440) + '天';
			minutes = minutes % 1440
		}
		if (minutes >= 60) { // 一小时
			str += Math.floor(minutes / 60) + '小时';
			minutes = minutes % 60;
		}
		if (minutes > 0) {
			str += minutes + '分钟';
		}
		return str
	}
}