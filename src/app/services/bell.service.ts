import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { BaseService } from './base.service';
import { BellNotification } from '../models/bell-notification.model';

import { CreateHttpError, ReadHttpError, UpdateHttpError, DeleteHttpError } from './http-errors';

@Injectable()
export class BellService extends BaseService<BellNotification[]> {

    private resourceUrl = '/bell';

    constructor(protected http: Http) {
        super(http);
    }

    public create(ntf: BellNotification): void {

       this.http.post(this.apiUrl + this.resourceUrl, JSON.stringify(ntf), this.getOptions())
                .catch(err => Observable.throw(new CreateHttpError(err.text())))
                .subscribe(
                    () => this.createSubject.next(),
                    (err: CreateHttpError) => this.errorSubject.next(err)
                );
    }

    public read(): void {

        this.http.get(this.apiUrl + this.resourceUrl, this.getOptions())
                 .map(res => res.json())
                 .catch(err => Observable.throw(new ReadHttpError(err.text())))
                 .subscribe(
                    (data: BellNotification[]) => this.readSubject.next(data),
                    (err: ReadHttpError) => this.errorSubject.next(err)
        );
    }

   public update(ntf: BellNotification): void {

        this.http.put(this.apiUrl + this.resourceUrl, JSON.stringify({ id: ntf.id }), this.getOptions())
                 .catch(err => Observable.throw(new UpdateHttpError(err.text())))
                 .subscribe(
                    (res: Response) => this.updateSubject.next(),
                    (err: UpdateHttpError) => this.errorSubject.next(err)
        );
    }

    public delete(id: string): void {

        const params = new URLSearchParams();
        params.set('id', id);
        const options = this.getOptions();
        options.search = params;

        this.http.delete(this.apiUrl + this.resourceUrl, options)
                 .catch(err => Observable.throw(new DeleteHttpError(err.text())))
                 .subscribe(
                    (res: Response) => this.deleteSubject.next(),
                    (err: DeleteHttpError) => this.errorSubject.next(err)
                 );
    }
}
