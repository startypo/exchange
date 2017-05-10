import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { AssetService } from '../../services/asset.service';
import { AppState } from '../../app.service';
import { NotifyService } from '../../modules/ui/notify';
import { CustomValidators } from '../../modules/ui/validate';
import { CurrencyPipe } from '../../modules/ui/pipes/currency.pipe';
import { AssetModel } from '../../models/asset.model';

@Component({
    selector: 'asset-edit',
    templateUrl: 'asset-edit.component.html',
    styleUrls: ['asset-edit.component.css']
})

export class AssetEditComponent implements OnInit {

    public form: FormGroup;
    public currencyMask: any;

    constructor (private service: AssetService, private notifyService: NotifyService,
                 private fb: FormBuilder, private router: Router, public currencyPipe: CurrencyPipe,
                 private app: AppState) {}

    public ngOnInit(): void {

        let asset: AssetModel = this.app.get('selectedAsset');

        this.form = this.fb.group({
            name: [asset ? asset.name : '', Validators.required],
            description: [asset ? asset.description : '', Validators.required],
            price: [asset ? asset.price : '', Validators.compose([Validators.required])],
            imgs: ['']
        });

        this.currencyMask = createNumberMask({
            prefix: 'ϝ ',
            suffix: '',
            allowDecimal: true
        });
    }

    public submit(form: FormGroup) {

        if (!form.valid) {

            Object.keys(form.controls).forEach(key => {
                form.get(key).markAsDirty();
            });

            return;
        }

        form.valueChanges.subscribe(() => this.notifyService.removeAll());

        this.service.create(form.value).subscribe(
            (res) => this.router.navigate(['/assets']),
            (err) => this.notifyService.error('XChanges', 'Something went wrong.'),
            () => this.notifyService.success('XChanges', 'Asset was successfully created.')
        );
    }
}
