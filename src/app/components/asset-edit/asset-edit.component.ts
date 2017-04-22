import { Component } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
    selector: 'asset-edit',
    templateUrl: 'asset-edit.component.html',
    styleUrls: ['asset-edit.component.css']
})

export class AssetEditComponent {

    public mask = createNumberMask({
        prefix: '$',
        allowDecimal: true
    });
    public priceModel = 1234.56;
}
