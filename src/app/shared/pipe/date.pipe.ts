// Exact copy of contact.awesome.pipe
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'articledate'})
/** Precede the input string with the word "Awesome " */
export class ArticleDatePipe implements PipeTransform {
    transform(date: string) {
        return new Date(date);
    }
}