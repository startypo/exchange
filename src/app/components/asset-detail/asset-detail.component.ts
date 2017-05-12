import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AssetService } from '../../services/asset.service';
import { NotifyService } from '../../modules/ui/notify/notify.service';
import { AssetModel } from '../../models/asset.model';

@Component({
    selector: 'asset-detail',
    templateUrl: 'asset-detail.component.html',
    styleUrls: ['asset-detail.component.css']
})

export class AssetDetailComponent implements OnInit {

    public model: AssetModel = new AssetModel();

    constructor(private service: AssetService, private notify: NotifyService,
                private router: Router, private route: ActivatedRoute,
                private app: AppState) {

        let id = this.route.snapshot.params['id'];

        if (id)
            this.read(id);
    }

    public ngOnInit(): void {}

    public delete() {

        this.service.delete(this.model).subscribe(
            () => this.notify.success('XChanges', 'Asset deleted successfully.'),
            (err) => this.notify.error('XChanges', 'Something went wrong.'),
            () => this.router.navigate(['/assets'])
        );
    }

    private read(id: string) {

        this.service.read(id).subscribe(
            (asset) => this.model = asset,
            (err) => this.notify.error('XChanges', 'Something went wrong.')
        );
    }
}
