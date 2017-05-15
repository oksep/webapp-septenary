import {Injectable} from "@angular/core";

import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

export class HeaderEvent {
    isAbsolute: boolean;

    constructor(isAbsolute: boolean) {
        this.isAbsolute = isAbsolute;
    }
}

@Injectable()
export class HeaderService {

    private eventSource: Subject<HeaderEvent> = new Subject<HeaderEvent>();
    public events: Observable<HeaderEvent> = this.eventSource.asObservable();

    constructor() {

    }

    changeHeaderAbsolute(isAbsolute: boolean) {
        this.eventSource.next(new HeaderEvent(isAbsolute));
    }

}