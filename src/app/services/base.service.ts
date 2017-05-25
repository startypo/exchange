import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';

import { HttpError } from './http-errors';
import { PaginatedList } from '../models/paginated-list.model';
import { UserModel } from '../modules/user/user.model';


@Injectable()
export class BaseService<T> {

    public onCreate: Observable<T>;
    public onRead: Observable<T>;
    public onUpdate: Observable<void>;
    public onDelete: Observable<void>;
    public onError: Observable<HttpError>;

    protected createSubject: Subject<T>;
    protected readSubject: Subject<T>;
    protected updateSubject: Subject<void>;
    protected deleteSubject: Subject<void>;
    protected errorSubject: Subject<HttpError>;

    protected apiUrl: string = 'api/v1';

    constructor(protected http: Http) {

        this.createSubject = new Subject<T>();
        this.onCreate = this.createSubject.asObservable();

        this.readSubject = new Subject<T>();
        this.onRead = this.readSubject.asObservable();

        this.updateSubject = new Subject<void>();
        this.onUpdate = this.updateSubject.asObservable();

        this.deleteSubject = new Subject<void>();
        this.onDelete = this.deleteSubject.asObservable();

        this.errorSubject = new Subject<HttpError>();
        this.onError = this.errorSubject.asObservable();
    }

    protected getHeaders(): Headers {

        let headers: Headers = new Headers();

        headers.append('Content-Type', 'application/json');
        let user: UserModel = JSON.parse(sessionStorage.getItem('user'));

        if (user)
            headers.append('Authorization', 'Bearer ' + user.token);

        return headers;
    }

    protected getOptions(): RequestOptions  {

        let options: RequestOptions = new RequestOptions();
        options.headers = this.getHeaders();

        return options;
    }
}
