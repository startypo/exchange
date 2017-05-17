import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { AssetService } from '../../services/asset.service';
import { NotifyService } from '../../modules/ui/notify';
import { UserService } from '../../modules/user/user.service';
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
    private id: string;

    constructor (private service: AssetService, private notify: NotifyService,
                 private router: Router, private route: ActivatedRoute,
                 private fb: FormBuilder, public currencyPipe: CurrencyPipe,
                 public userService: UserService) {

        this.configForm();

        this.id = this.route.snapshot.params['id'];
        if (this.id)
            this.read(this.id);
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

        if (this.id) {

            let asset: AssetModel = form.value;
            asset.id = this.id;

            this.service.update(asset).subscribe(
                (res) => this.router.navigate(['/assets']),
                (err) => this.notify.error('XChanges', 'Something went wrong.'),
                () => this.notify.success('XChanges', 'Asset was successfully updated.')
            );

        } else {

            this.service.create(form.value).subscribe(
                (res) => this.router.navigate(['/assets']),
                (err) => this.notify.error('XChanges', 'Something went wrong.'),
                () => this.notify.success('XChanges', 'Asset was successfully created.')
            );
        }
    }

    public uploadDone(filename: string): void {

        let asset: AssetModel = this.form.value;
        asset.imgs.push(filename);
        this.form.patchValue(asset);
    }

    private configForm() {

        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.compose([Validators.required, CustomValidators.number()])],
            imgs: [[]]
        });

        this.currencyMask = createNumberMask({
            prefix: 'ϝ ',
            suffix: '',
            allowDecimal: true
        });
    }

    private read(id: string) {

        this.service.read(id).subscribe(
            (asset) => {

                this.form.patchValue(asset);
            },
            (err) => this.notify.error('XChanges', 'Something went wrong.')
        );
    }
}
