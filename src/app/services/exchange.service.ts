import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { Exchange } from '../models/exchange.model';
import { PaginatedList } from '../models/paginated-list.model';

import { CreateHttpError, ReadHttpError, UpdateHttpError, DeleteHttpError } from './http-errors';
import { ExchangeList } from '../models/exchange-list.model';

@Injectable()
export class ExchangeService extends BaseService<Exchange> {

    public onList: Observable<ExchangeList>;
    public onSend: Observable<Exchange>;
    public onReceive: Observable<Exchange>;

    protected listSubject: Subject<ExchangeList>;
    protected sendSubject: Subject<Exchange>;
    protected receiveSubject: Subject<Exchange>;

    private resourceUrl = '/exchange';

    constructor(protected http: Http) {
        super(http);

        this.listSubject = new Subject<ExchangeList>();
        this.onList = this.listSubject.asObservable();

        this.sendSubject = new Subject<Exchange>();
        this.onSend = this.sendSubject.asObservable();

        this.receiveSubject = new Subject<Exchange>();
        this.onReceive = this.receiveSubject.asObservable();
    }

    public create(assetId: string): void {

       this.http.post(this.apiUrl + this.resourceUrl, JSON.stringify({ assetId: assetId }), this.getOptions())
                .catch(err => Observable.throw(new CreateHttpError(err.text())))
                .subscribe(
                    () => this.createSubject.next(),
                    (err: CreateHttpError) => this.errorSubject.next(err)
                );
    }

    public read(id: string): void {

        const params = new URLSearchParams();
        params.set('id', id);
        const options = this.getOptions();
        options.search = params;

        this.http.get(this.apiUrl + this.resourceUrl, options)
                 .map(res => res.json())
                 .catch(err => Observable.throw(new ReadHttpError(err.text())))
                 .subscribe(
                    (data: Exchange) => this.readSubject.next(data),
                    (err: ReadHttpError) => this.errorSubject.next(err)
                 );
    }

    public send(exchange: Exchange): void {

        this.http.put(this.apiUrl + this.resourceUrl + '/send',
                      JSON.stringify({ id: exchange.id, trackingCode: exchange.trackingCode }),
                      this.getOptions())
                 .map(res => res.json())
                 .catch(err => Observable.throw(new UpdateHttpError(err.text())))
                 .subscribe(
                    (data: Exchange) => this.sendSubject.next(data),
                    (err: UpdateHttpError) => this.errorSubject.next(err)
                 );
    }

    public receive(exchange: Exchange): void {

        this.http.put(this.apiUrl + this.resourceUrl + '/receive',
                      JSON.stringify({ id: exchange.id, trackingCode: exchange.trackingCode }),
                      this.getOptions())
                 .map(res => res.json())
                 .catch(err => Observable.throw(new UpdateHttpError(err.text())))
                 .subscribe(
                    (data: Exchange) => this.receiveSubject.next(data),
                    (err: UpdateHttpError) => this.errorSubject.next(err)
                 );
    }

    public list(): void {

        this.http.get(this.apiUrl + this.resourceUrl + '/list', this.getOptions())
                 .map((res) => res.json())
                 .catch(err => Observable.throw(new ReadHttpError(err.text())))
                 .subscribe(
                     (data: ExchangeList) => this.listSubject.next(data),
                     (err: ReadHttpError) => this.errorSubject.next(err)
                 );
    }
}
