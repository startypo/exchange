import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { PaginatedList } from '../models/paginated-list.model';
import { AssetModel } from '../models/asset.model';

@Injectable()
export class AssetService extends BaseService {

    private resourceUrl = '/asset';

    constructor(private http: Http) {
        super();
    }

    public create(asset: AssetModel): Observable<Response> {
        return this.http.post(this.apiUrl + this.resourceUrl, JSON.stringify(asset), { headers: this.getHeaders() });
    }

    public list(page: number): Observable<PaginatedList<AssetModel>> {

        let params = new URLSearchParams();
        params.set('page', page.toString());
        let options = new RequestOptions();

        options.headers = this.getHeaders();
        options.search = params;

        return this.http.get(this.apiUrl + this.resourceUrl + '/list', options)
                        .map((res) => res.json());
    }
}
