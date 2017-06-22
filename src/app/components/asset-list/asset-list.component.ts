import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { NotifyService } from '../../modules/ui/notify';
import { AssetService } from '../../services/asset.service';
import { PaginatedList } from '../../models/paginated-list.model';
import { Asset } from '../../models/asset.model';
import { CurrencyPipe } from '../../modules/ui/pipes/currency.pipe';

@Component({

    selector: 'asset-list',
    templateUrl: 'asset-list.component.html',
    styleUrls: ['asset-list.component.css', './style.scss']
})

export class AssetListComponent implements OnInit, OnDestroy {

    public model: PaginatedList<Asset> = new PaginatedList<Asset>();
    public term: string;

    private onParams: Subscription;
    private onList: Subscription;
    private onSearch: Subscription;
    private onError: Subscription;

    constructor(private service: AssetService, private notify: NotifyService,
                private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {

        this.onSearch = this.service.onSearch.subscribe(
            (assets: PaginatedList<Asset>) => this.model = assets
        );

        this.onList = this.service.onList.subscribe(
            (assets: PaginatedList<Asset>) => this.model = assets
        );

        this.onError = this.service.onError.subscribe(
            (err) => this.notify.error('Exchange', 'Algo deu errado.')
        );

        if (this.isList())
            this.service.list(1);
        else {
            this.term = this.route.snapshot.params['term'];
            this.onParams = this.route.params.subscribe(params => {
                this.term = params['term'];
                this.service.search(this.term, 1);
            });
        }
    }

    public ngOnDestroy(): void {

        if (this.onParams)
            this.onParams.unsubscribe();

        this.onList.unsubscribe();
        this.onSearch.unsubscribe();
        this.onError.unsubscribe();
    }

    public isList(): boolean {
        return this.router.isActive('/assets', true);
    }

    public paginate(page: number, term?: string) {

        if (term)
            this.service.search(term, page);
        else
            this.service.list(page);
    }
}
