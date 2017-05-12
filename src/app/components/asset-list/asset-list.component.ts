import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

export class AssetListComponent implements OnDestroy {

    public model: PaginatedList<AssetModel> = new PaginatedList<AssetModel>();
    public term: string;
    public sub: any;

    constructor(private service: AssetService, private notify: NotifyService,
                private router: Router, private route: ActivatedRoute) {

        this.term = this.route.snapshot.params['term'];

        if (this.term) {

            this.sub = this.route.params.subscribe(params => {
                this.term = params['term'];
                this.search(1, this.term);
            });

        } else
            this.listUserAssets(1);
    }

    public ngOnDestroy(): void {

        if (this.sub)
            this.sub.unsubscribe();
    }

    public paginate(page: number, term?: string) {

        if (term)
            this.search(page, term);
        else
            this.listUserAssets(page);
    }

    private listUserAssets(page: number) {

        this.service.list(page).subscribe(
            (list: PaginatedList<AssetModel>) => this.model = list,
            (err) => this.notify.error('Xchanges', 'Something went wrong.')
        );
    }

    private search(page: number, term: string) {

        this.service.search(term, page).subscribe(
            (search: PaginatedList<AssetModel>) => this.model = search,
            (err) => this.notify.error('Xchanges', 'Something went wrong.')
        );
    }
}
