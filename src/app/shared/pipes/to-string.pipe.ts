import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'toString'})
export class ToStringPipe implements PipeTransform {
	transform(date: any) {
		return date ? JSON.stringify(date) : 'null';
	}
}