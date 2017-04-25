import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { AssetModel } from '../models/asset.model';

@Injectable()
export class AssetService {

    private apiUrl: string = 'api/v1/asset';

    constructor(private http: Http) {}

    public create(model: AssetModel): Observable<Response> {
        return this.http.post(this.apiUrl + '/', JSON.stringify({asset: model}), this.getHeaders());
    }

    private getHeaders(): RequestOptions {

        let _headers: Headers = new Headers();

        _headers.append('Content-Type', 'application/json');
        let token = localStorage.getItem('token');

        if (token)
            _headers.append('Authorization', 'Bearer ' + token);

        return new RequestOptions({ headers: _headers });
    }
}
