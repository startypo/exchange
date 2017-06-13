import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExchangeService } from '../../services/exchange.service';
import { NotifyService } from '../../modules/ui/notify';

import { CurrencyPipe } from '../../modules/ui/pipes/currency.pipe';
import { ExchangeList } from '../../models/exchange-list.model';

@Component({
    selector: 'exchange',
    templateUrl: 'exchange.component.html',
    styleUrls: ['exchange.component.css']
})

export class ExchangeComponent implements OnInit, OnDestroy {

    public model: ExchangeList = new ExchangeList();

    private onList: Subscription;
    private onError: Subscription;

    constructor(private service: ExchangeService, private notify: NotifyService,
                private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {

        this.onList = this.service.onList.subscribe(
            (data: ExchangeList) => this.model = data
        );

        this.onError = this.service.onError.subscribe(
            (err) => this.notify.error('Xchanges', 'Something went wrong.')
        );

        this.service.list();
    }

    public ngOnDestroy(): void {

        this.onList.unsubscribe();
        this.onError.unsubscribe();
    }
}
