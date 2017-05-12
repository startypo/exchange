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
        return this.http.post(this.apiUrl + this.resourceUrl, JSON.stringify(asset), this.getOptions());
    }

    public read(id: string): Observable<AssetModel> {

        let params = new URLSearchParams();
        params.set('id', id);
        let options = this.getOptions();
        options.search = params;

        return this.http.get(this.apiUrl + this.resourceUrl, options)
                        .map((res) => res.json());
    }

    public list(page: number): Observable<PaginatedList<AssetModel>> {

        let params = new URLSearchParams();
        params.set('page', page.toString());
        let options = this.getOptions();
        options.search = params;

        return this.http.get(this.apiUrl + this.resourceUrl + '/list', options)
                        .map((res) => res.json());
    }

    public delete(asset: AssetModel): Observable<Response> {

        let params = new URLSearchParams();
        params.set('id', asset._id);
        let options = this.getOptions();
        options.search = params;

        return this.http.delete(this.apiUrl + this.resourceUrl, options);
    }

}
