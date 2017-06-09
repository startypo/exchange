import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExchangeService } from '../../services/exchange.service';
import { NotifyService } from '../../modules/ui/notify';


import { PaginatedList } from '../../models/paginated-list.model';
import { Exchange } from '../../models/exchange.model';
import { CurrencyPipe } from '../../modules/ui/pipes/currency.pipe';

@Component({
    selector: 'exchange',
    templateUrl: 'exchange.component.html',
    styleUrls: ['exchange.component.css']
})

export class ExchangeComponent implements OnInit, OnDestroy {

    public model: PaginatedList<Exchange> = new PaginatedList<Exchange>();

    private onList: Subscription;
    private onError: Subscription;

    constructor(private service: ExchangeService, private notify: NotifyService,
                private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {

        this.onList = this.service.onList.subscribe(
            (data: PaginatedList<Exchange>) => this.model = data
        );

        this.onError = this.service.onError.subscribe(
            (err) => this.notify.error('Xchanges', 'Something went wrong.')
        );

        this.service.list(1);
    }

    public ngOnDestroy(): void {

        this.onList.unsubscribe();
        this.onError.unsubscribe();
    }

    public paginate(event: any) {
        this.service.list(event.page);
    }
}
