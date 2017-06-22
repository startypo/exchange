import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { Hand } from '../models/hand.model';

import { CreateHttpError, ReadHttpError, UpdateHttpError, DeleteHttpError } from './http-errors';


@Injectable()
export class HandService extends BaseService<Hand> {

    public onCredit: Observable<Hand>;
    protected creditSubject: Subject<Hand>;

    private resourceUrl = '/hand';

    constructor(protected http: Http) {
        super(http);

        this.creditSubject = new Subject<Hand>();
        this.onCredit = this.creditSubject.asObservable();
    }

    public read(): void {

        this.http.get(this.apiUrl + this.resourceUrl, this.getOptions())
                 .map(res => res.json())
                 .catch(err => Observable.throw(new ReadHttpError(err.text())))
                 .subscribe(
                    (data: Hand) => this.readSubject.next(data),
                    (err: ReadHttpError) => this.errorSubject.next(err)
                 );
    }

    public credit(time: number): void {

        this.http.put(this.apiUrl + this.resourceUrl, JSON.stringify({ time: time }), this.getOptions())
                 .map(res => res.json())
                 .catch(err => Observable.throw(new UpdateHttpError(err.text())))
                 .subscribe(
                    (data: Hand) => this.creditSubject.next(data),
                    (err: UpdateHttpError) => this.errorSubject.next(err)
                 );
    }
}
