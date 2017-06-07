import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExchangeService } from '../../services/exchange.service';
import { NotifyService } from '../../modules/ui/notify';


import { PaginatedList } from '../../models/paginated-list.model';
import { Exchange } from '../../models/exchange.model';
import { Asset } from '../../models/asset.model';
import { CurrencyPipe } from '../../modules/ui/pipes/currency.pipe';

@Component({

    selector: 'exchange',
    templateUrl: 'exchange.component.html',
    styleUrls: ['exchange.component.css']
})

export class ExchangeComponent implements OnInit, OnDestroy {

    public model: PaginatedList<Asset> = new PaginatedList<Asset>();

    private onError: Subscription;

    constructor(private service: ExchangeService, private notify: NotifyService,
                private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {


        this.onError = this.service.onError.subscribe(
            (err) => this.notify.error('Xchanges', 'Something went wrong.')
        );

    }

    public ngOnDestroy(): void {

        this.onError.unsubscribe();
    }

    public paginate(page: number, term?: string) {


    }
}
