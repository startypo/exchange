import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AssetService } from '../../services/asset.service';
import { ExchangeService } from '../../services/exchange.service';
import { UserService } from '../../modules/user/user.service';
import { NotifyService } from '../../modules/ui/notify/notify.service';
import { BellService } from '../../services/bell.service';

import { Asset } from '../../models/asset.model';
import { BellNotification } from '../../models/bell-notification.model';

@Component({
    selector: 'asset-detail',
    templateUrl: 'asset-detail.component.html',
    styleUrls: ['asset-detail.component.css', './style.scss']
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
                private bellService: BellService, private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {

        this.onRead = this.service.onRead.subscribe(
            (asset) => this.model = asset
        );

        this.onDelete = this.service.onDelete.subscribe(() => {
            this.notify.success('Exchange', 'Excluído com sucesso.');
            this.router.navigate(['/assets']);
        });

        this.onError = this.service.onError.subscribe(
            (err) => this.router.navigate(['/error'])
        );

        this.onExchangeCreate = this.exchangeService.onCreate.subscribe(() => {

            this.bellNotification();
            this.notify.success('Exchange', 'A troca foi iniciada.');
            this.router.navigate(['/exchanges']);
        });

        this.onExchangeError = this.exchangeService.onError.subscribe(
            (err) => this.notify.warning('Exchange', 'Não há créditos suficientes para realizar esta troca.')
        );

        const id = this.route.snapshot.params['id'];

        if (id)
            this.service.read(id);
    }

    public ngOnDestroy(): void {

        this.onRead.unsubscribe();
        this.onDelete.unsubscribe();
        this.onError.unsubscribe();
        this.onExchangeCreate.unsubscribe();
        this.onExchangeError.unsubscribe();
    }

    public delete() {
        this.service.delete(this.model.id);
    }

    public exchange() {
        this.exchangeService.create(this.model.id);
    }

    private bellNotification() {

        const ntf = new BellNotification();
        ntf.msg = this.userService.user.name + ': solicitou uma troca.';
        ntf.receiver = this.model.owner;
        ntf.resourceId = this.model.id;

        this.bellService.create(ntf);
    }
}
