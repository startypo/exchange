import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


import { AssetService } from '../../services/asset.service';
import { ExchangeService } from '../../services/exchange.service';
import { UserService } from '../../modules/user/user.service';
import { NotifyService } from '../../modules/ui/notify/notify.service';

import { Asset } from '../../models/asset.model';


@Component({
    selector: 'asset-detail',
    templateUrl: 'asset-detail.component.html',
    styleUrls: ['asset-detail.component.css']
})

export class AssetDetailComponent implements OnInit, OnDestroy {

    public model: Asset = new Asset();

    private onRead: Subscription;
    private onDelete: Subscription;
    private onError: Subscription;
    private onExchangeCreate: Subscription;
    private onExchangeError: Subscription;

    constructor(private service: AssetService, private exchangeService: ExchangeService,
                private notify: NotifyService, public userService: UserService,
                private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {

        this.onRead = this.service.onRead.subscribe(
            (asset) => this.model = asset
        );

        this.onDelete = this.service.onDelete.subscribe(() => {
            this.notify.success('XChanges', 'Asset deleted successfully.');
            this.router.navigate(['/assets']);
        });

        this.onError = this.service.onError.subscribe(
            (err) => this.notify.error('XChanges', 'Something went wrong.')
        );

        this.onExchangeCreate = this.exchangeService.onCreate.subscribe(
            () => console.log('criou a troca!')
        );

        let id = this.route.snapshot.params['id'];

        if (id)
            this.service.read(id);
    }

    public ngOnDestroy(): void {

        this.onRead.unsubscribe();
        this.onDelete.unsubscribe();
        this.onError.unsubscribe();
    }

    public delete() {
        this.service.delete(this.model.id);
    }

    public exchange() {
        this.exchangeService.create(this.model.id);
    }
}
