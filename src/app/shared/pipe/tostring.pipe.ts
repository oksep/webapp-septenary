// Exact copy of contact.awesome.pipe
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'tostring'})
/** Precede the input string with the word "Awesome " */
export class ToStringPipe implements PipeTransform {
    transform(date: any) {
        return date ? JSON.stringify(date) : 'null';
    }
}