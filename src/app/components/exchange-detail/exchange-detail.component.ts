import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExchangeService } from '../../services/exchange.service';
import { NotifyService } from '../../modules/ui/notify';

import { CurrencyPipe } from '../../modules/ui/pipes/currency.pipe';
import { Exchange } from '../../models/exchange.model';

@Component({
    selector: 'exchange-detail',
    templateUrl: 'exchange-detail.component.html',
    styleUrls: ['exchange-detail.component.css']
})

export class ExchangeDetailComponent implements OnInit, OnDestroy {

    public model: Exchange = new Exchange();

    private onRead: Subscription;
    private onError: Subscription;

    constructor(private service: ExchangeService, private notify: NotifyService,
                private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {

        this.onRead = this.service.onRead.subscribe(
            (data: Exchange) => this.model = data
        );

        this.onError = this.service.onError.subscribe(
            (err) => this.notify.error('Xchanges', 'Something went wrong.')
        );

        const id = this.route.snapshot.params['id'];

        if (id)
            this.service.read(id);
    }

    public ngOnDestroy(): void {

        this.onError.unsubscribe();
    }
}
