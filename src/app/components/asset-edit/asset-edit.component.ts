import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { AssetService } from '../../services/asset.service';
import { NotifyService } from '../../modules/ui/notify';
import { UserService } from '../../modules/user/user.service';
import { FileService } from '../../modules/ui/fileuploader/file.service';
import { CustomValidators } from '../../modules/ui/validate';
import { CurrencyPipe } from '../../modules/ui/pipes/currency.pipe';
import { Asset } from '../../models/asset.model';

import { ReadHttpError } from '../../services/http-errors';

@Component({
    selector: 'asset-edit',
    templateUrl: 'asset-edit.component.html',
    styleUrls: ['asset-edit.component.css']
})

export class AssetEditComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public model: Asset = new Asset();
    public currencyMask: any;
    public files: any[] = [];

    private onCreate: Subscription;
    private onRead: Subscription;
    private onUpdate: Subscription;
    private onRemove: Subscription;
    private onError: Subscription;

    constructor(private service: AssetService, public userService: UserService,
                private notify: NotifyService, private fileService: FileService,
                private router: Router, private route: ActivatedRoute,
                private fb: FormBuilder, public currencyPipe: CurrencyPipe) {

        this.configForm();
    }

    public ngOnInit(): void {

        this.onCreate = this.service.onCreate.subscribe(
            asset => {
                this.notify.success('Exchange', 'Criado com sucesso.');
                this.router.navigate(['/assets']);
            }
        );

        this.onRead = this.service.onRead.subscribe((asset: Asset) => {
            this.form.patchValue(asset);
            asset.imgs.forEach(filename => this.fileService.download(filename));
        });

        this.onUpdate = this.service.onUpdate.subscribe(
            asset => {
                this.notify.success('Exchange', 'Atualizado com sucesso.');
                this.router.navigate(['/assets']);
            }
        );

        this.onRemove = this.fileService.onRemove.subscribe(
            (filename: string) => {

                let asset: Asset = this.form.value;
                let index = asset.imgs.indexOf(filename);
                asset.imgs.splice(index, 1);
                this.form.patchValue(asset);
            }
        );

        this.onError = this.service.onError.subscribe(
            err => this.notify.error('Exhange', 'Algo deu errado.')
        );

        this.model.id = this.route.snapshot.params['id'];

        if (this.model.id)
            this.service.read(this.model.id);
    }

    public ngOnDestroy(): void {

        this.onCreate.unsubscribe();
        this.onRead.unsubscribe();
        this.onUpdate.unsubscribe();
        this.onRemove.unsubscribe();
        this.onError.unsubscribe();
    }

    public submit(form: FormGroup) {

        if (!form.valid) {

            Object.keys(form.controls).forEach(key => {
                form.get(key).markAsDirty();
            });

            return;
        }

        form.valueChanges.subscribe(() => this.notify.removeAll());
        (<any> Object).assign(this.model, form.value);

        if (this.model.id)
            this.service.update(this.model);
        else
            this.service.create(this.model);
    }

    public uploadDone(event: any): void {

        let asset: Asset = this.form.value;
        asset.imgs.push(event.filename);
        this.form.patchValue(asset);
        this.form.controls.imgs.markAsDirty();
    }

    public uploadError(event: any) {
        this.notify.error('File Upload', 'Something went wrong.');
    }

    public rejected(event: any) {
        this.notify.warning('File Upload', event.reason);
    }

    private configForm() {

        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.compose([Validators.required, CustomValidators.number()])],
            imgs: [[], Validators.required]
        });

        this.currencyMask = createNumberMask({
            prefix: 'ϝ ',
            suffix: '',
            allowDecimal: true
        });
    }
}
