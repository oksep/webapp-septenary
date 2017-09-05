import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

	transform(time: any, format?: any): any {
		return time ? (new Date(time)).format(format || "yyyy-MM-dd hh:mm:ss") : '-';
	}

}
