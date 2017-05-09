import { Component, OnInit } from '@angular/core';

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

    constructor(private service: AssetService, private notifyService: NotifyService) {}

    public ngOnInit(): void {

        this.list(1);
    }

    public list(page: number) {

        this.service.list(page).subscribe(
            (list: PaginatedList<AssetModel>) => this.model = list,
            (err) => this.notifyService.error('Xchanges', 'Something went wrong.')
        );
    }
}

