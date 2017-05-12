import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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


    constructor (private service: AssetService, private notify: NotifyService,
                 private router: Router, private route: ActivatedRoute,
                 private fb: FormBuilder, public currencyPipe: CurrencyPipe,
                 private app: AppState) {

        this.configForm();

        let id = this.route.snapshot.params['id'];
        if (id)
            this.read(id);
    }

    public ngOnInit(): void {}

    public submit(form: FormGroup) {

        if (!form.valid) {

            Object.keys(form.controls).forEach(key => {
                form.get(key).markAsDirty();
            });

            return;
        }

        form.valueChanges.subscribe(() => this.notify.removeAll());

        this.service.create(form.value).subscribe(
            (res) => this.router.navigate(['/assets']),
            (err) => this.notify.error('XChanges', 'Something went wrong.'),
            () => this.notify.success('XChanges', 'Asset was successfully created.')
        );
    }

    private configForm() {

        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.compose([Validators.required, CustomValidators.number()])],
            imgs: ['']
        });

        this.currencyMask = createNumberMask({
            prefix: 'ϝ ',
            suffix: '',
            allowDecimal: true
        });
    }

    private read(id: string) {

        this.service.read(id).subscribe(
            (asset) => this.form.patchValue(asset),
            (err) => this.notify.error('XChanges', 'Something went wrong.')
        );
    }
}
