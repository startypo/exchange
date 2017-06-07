import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { Exchange } from '../models/exchange.model';
import { PaginatedList } from '../models/paginated-list.model';

import { CreateHttpError, ReadHttpError, UpdateHttpError, DeleteHttpError } from './http-errors';



@Injectable()
export class ExchangeService extends BaseService<Exchange> {

    public onList: Observable<PaginatedList<Exchange>>;
    protected listSubject: Subject<PaginatedList<Exchange>>;

    private resourceUrl = '/exchange';

    constructor(protected http: Http) {
        super(http);

        this.listSubject = new Subject<PaginatedList<Exchange>>();
        this.onList = this.listSubject.asObservable();
    }

    public create(assetId: string): void {

       this.http.post(this.apiUrl + this.resourceUrl, JSON.stringify({ assetId: assetId }), this.getOptions())
                .map(res => res.json())
                .catch(err => Observable.throw(new CreateHttpError(err.text())))
                .subscribe(
                    (data: Exchange) => this.createSubject.next(data),
                    (err: CreateHttpError) => this.errorSubject.next(err)
                );
    }

    public list(page: number): void {

        let params = new URLSearchParams();
        params.set('page', page.toString());
        let options = this.getOptions();
        options.search = params;

        this.http.get(this.apiUrl + this.resourceUrl + '/list', options)
                 .map((res) => res.json())
                 .catch(err => Observable.throw(new ReadHttpError(err.text())))
                 .subscribe(
                     (data: PaginatedList<Exchange>) => this.listSubject.next(data),
                     (err: ReadHttpError) => this.errorSubject.next(err)
                 );
    }
}
