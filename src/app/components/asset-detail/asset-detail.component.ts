import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';

import { AssetModel } from '../../models/asset.model';

@Component({
    selector: 'asset-detail',
    templateUrl: 'asset-detail.component.html',
    styleUrls: ['asset-detail.component.css']
})

export class AssetDetailComponent implements OnInit {

    public model: AssetModel;

    constructor(private app: AppState) {}

    public ngOnInit(): void {

        this.model = this.app.get('selectedAsset');
    }
}
