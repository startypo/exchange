import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CropperSettings } from 'ng2-img-cropper';

import { AssetService } from '../../services/asset.service';
import { NotifyService } from '../../modules/ui/notify/notify.service';
import { AssetModel } from '../../models/asset.model';
import { UserService } from '../../modules/user/user.service';

@Component({
    selector: 'asset-detail',
    templateUrl: 'asset-detail.component.html',
    styleUrls: ['asset-detail.component.css']
})

export class AssetDetailComponent implements OnInit {

    public model: AssetModel = new AssetModel();
    public cropperSettings: CropperSettings;

    constructor(private service: AssetService, private notify: NotifyService,
                public userService: UserService, private router: Router,
                private route: ActivatedRoute, private app: AppState) {

        let id = this.route.snapshot.params['id'];

        if (id)
            this.read(id);

        // this.cropperSettings = new CropperSettings();
        // this.cropperSettings.width = 1120;
        // this.cropperSettings.height = 440;

        // this.cropperSettings.croppedWidth = 1120;
        // this.cropperSettings.croppedHeight = 440;

        // this.cropperSettings.canvasWidth = 1120;
        // this.cropperSettings.canvasHeight = 440;

        // this.cropperSettings.minWidth = 1120;
        // this.cropperSettings.minHeight = 440;

        // this.cropperSettings.rounded = false;

        // this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        // this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
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
