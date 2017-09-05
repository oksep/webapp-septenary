// Exact copy of contact.awesome.pipe
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'summarycutter'})
/** Precede the input string with the word "Awesome " */
export class SummaryPipe implements PipeTransform {
	transform(phrase: string) {
		let index = phrase.indexOf('\n');
		if (index > 0) {
			return phrase.substring(phrase.indexOf('\n'));
		}
		return phrase;
	}
}