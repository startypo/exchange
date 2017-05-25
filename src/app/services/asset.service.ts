import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { PaginatedList } from '../models/paginated-list.model';
import { Asset } from '../models/asset.model';

import { CreateHttpError, ReadHttpError, UpdateHttpError, DeleteHttpError } from './http-errors';


@Injectable()
export class AssetService extends BaseService<Asset> {

    public onSearch: Observable<PaginatedList<Asset>>;
    public onList: Observable<PaginatedList<Asset>>;
    protected searchSubject: Subject<PaginatedList<Asset>>;
    protected listSubject: Subject<PaginatedList<Asset>>;

    private resourceUrl = '/asset';

    constructor(protected http: Http) {
        super(http);

        this.searchSubject = new Subject<PaginatedList<Asset>>();
        this.onSearch = this.searchSubject.asObservable();

        this.listSubject = new Subject<PaginatedList<Asset>>();
        this.onList = this.listSubject.asObservable();
    }

    public create(asset: Asset): void {

       this.http.post(this.apiUrl + this.resourceUrl, JSON.stringify(asset), this.getOptions())
                .map(res => res.json())
                .catch(err => Observable.throw(new CreateHttpError(err.text())))
                .subscribe(
                    (data: Asset) => this.createSubject.next(data),
                    (err: CreateHttpError) => this.errorSubject.next(err)
                );
    }

    public read(id: string): void {

        let params = new URLSearchParams();
        params.set('id', id);
        let options = this.getOptions();
        options.search = params;

        this.http.get(this.apiUrl + this.resourceUrl, options)
                 .map(res => res.json())
                 .catch(err => Observable.throw(new ReadHttpError(err.text())))
                 .subscribe(
                    (data: Asset) => this.readSubject.next(data),
                    (err: ReadHttpError) => this.errorSubject.next(err)
                 );
    }

    public update(asset: Asset): void {

        this.http.put(this.apiUrl + this.resourceUrl, JSON.stringify(asset), this.getOptions())
                 .catch(err => Observable.throw(new UpdateHttpError(err.text())))
                 .subscribe(
                    (res: Response) => this.updateSubject.next(),
                    (err: UpdateHttpError) => this.errorSubject.next(err)
                 );
    }

    public delete(id: string): void {

        let params = new URLSearchParams();
        params.set('id', id);
        let options = this.getOptions();
        options.search = params;

        this.http.delete(this.apiUrl + this.resourceUrl, options)
                 .catch(err => Observable.throw(new DeleteHttpError(err.text())))
                 .subscribe(
                    (res: Response) => this.deleteSubject.next(),
                    (err: DeleteHttpError) => this.errorSubject.next(err)
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
                     (data: PaginatedList<Asset>) => this.listSubject.next(data),
                     (err: ReadHttpError) => this.errorSubject.next(err)
                 );
    }

    public search(term: string, page: number): void {

        let params = new URLSearchParams();
        params.set('term', term);
        params.set('page', page.toString());
        let options = this.getOptions();
        options.search = params;

        this.http.get(this.apiUrl + this.resourceUrl + '/search', options)
                 .map((res) => res.json())
                 .catch(err => Observable.throw(new ReadHttpError(err.text())))
                 .subscribe(
                     (data: PaginatedList<Asset>) => this.searchSubject.next(data),
                     (err: ReadHttpError) => this.errorSubject.next(err)
                 );
    }
}
