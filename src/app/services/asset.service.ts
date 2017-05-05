import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { AssetModel } from '../models/asset.model';


@Injectable()
export class AssetService extends BaseService {

    private resourceUrl = '/asset';

    constructor(private http: Http) {
        super();
    }

    public create(asset: AssetModel): Observable<Response> {
        return this.http.post(this.apiUrl + this.resourceUrl, JSON.stringify(asset), this.getHeaders());
    }
}
