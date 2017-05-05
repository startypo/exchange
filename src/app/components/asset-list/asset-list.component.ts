import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../modules/ui/notify';

@Component({

    selector: 'asset-list',
    templateUrl: 'asset-list.component.html',
    styleUrls: ['asset-list.component.css']
})

export class AssetListComponent {

    constructor(private notifyService: NotifyService) {}
}
