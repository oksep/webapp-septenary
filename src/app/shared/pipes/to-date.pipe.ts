// Exact copy of contact.awesome.pipe
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'to-date'})
/** Precede the input string with the word "Awesome " */
export class ToDatePipe implements PipeTransform {
	transform(date: string) {
		return new Date(date);
	}
}