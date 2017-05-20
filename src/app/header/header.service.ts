import {Injectable} from "@angular/core";

import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

export class HeaderEvent {
    isHollow: boolean;

    constructor(isHollow: boolean) {
        this.isHollow = isHollow;
    }
}

@Injectable()
export class HeaderService {

    private eventSource: Subject<HeaderEvent> = new Subject<HeaderEvent>();
    public events: Observable<HeaderEvent> = this.eventSource.asObservable();

    constructor() {

    }

    changeHeaderHollow(isHollow: boolean) {
        this.eventSource.next(new HeaderEvent(isHollow));
    }

}