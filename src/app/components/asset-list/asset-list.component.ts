import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../app.service';

import { NotifyService } from '../../modules/ui/notify';
import { AssetService } from '../../services/asset.service';
import { PaginatedList } from '../../models/paginated-list.model';
import { AssetModel } from '../../models/asset.model';
import { CurrencyPipe } from '../../modules/ui/pipes/currency.pipe';

@Component({

    selector: 'asset-list',
    templateUrl: 'asset-list.component.html',
    styleUrls: ['asset-list.component.css']
})

export class AssetListComponent implements OnInit {

    public model: PaginatedList<AssetModel> = new PaginatedList<AssetModel>();

    constructor(private service: AssetService, private notify: NotifyService, private router: Router) {

        this.list(1);
    }

    public ngOnInit(): void {}

    public list(page: number) {

        this.service.list(page).subscribe(
            (list: PaginatedList<AssetModel>) => this.model = list,
            (err) => this.notify.error('Xchanges', 'Something went wrong.')
        );
    }
}
