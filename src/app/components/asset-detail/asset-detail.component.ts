import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


import { AssetService } from '../../services/asset.service';
import { NotifyService } from '../../modules/ui/notify/notify.service';
import { Asset } from '../../models/asset.model';
import { UserService } from '../../modules/user/user.service';

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

    constructor(private service: AssetService, private notify: NotifyService,
                public userService: UserService, private router: Router,
                private route: ActivatedRoute, private app: AppState) {


    }

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
}
