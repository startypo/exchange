import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class EventService {

    public onMenuClick: Observable<Event>;
    protected menuSubject: Subject<Event>;

    constructor() {

        this.menuSubject = new Subject<Event>();
        this.onMenuClick = this.menuSubject.asObservable();
    }

    public menuClick(e: Event) {
        this.menuSubject.next(e);
    }
}
