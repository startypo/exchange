import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExchangeService } from '../../services/exchange.service';
import { NotifyService } from '../../modules/ui/notify';

import { CurrencyPipe } from '../../modules/ui/pipes/currency.pipe';
import { Exchange } from '../../models/exchange.model';
import { UserService } from '../../modules/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from "../../modules/ui/validate/custom.validators";

@Component({
    selector: 'exchange-detail',
    templateUrl: 'exchange-detail.component.html',
    styleUrls: ['exchange-detail.component.css', './style.scss']
})

export class ExchangeDetailComponent implements OnInit, OnDestroy {

    public model: Exchange = new Exchange();
    public form: FormGroup;

    private onRead: Subscription;
    private onSend: Subscription;
    private onReceive: Subscription;
    private onError: Subscription;

    constructor(private service: ExchangeService, private userService: UserService,
                private notify: NotifyService, private router: Router,
                private route: ActivatedRoute, private fb: FormBuilder) {

        this.configForm();
    }

    public ngOnInit(): void {

        this.onRead = this.service.onRead.subscribe(
            (data: Exchange) => this.model = data
        );

        this.onSend = this.service.onSend.subscribe((data: Exchange) => {
            data.asset = this.model.asset;
            this.model = data;
            this.notify.success('Exchange', 'O item foi enviado.');
        });

        this.onError = this.service.onError.subscribe(
            (err) => this.router.navigate(['/error'])
        );

        const id = this.route.snapshot.params['id'];

        if (id)
            this.service.read(id);
    }

    public ngOnDestroy(): void {

        this.onRead.unsubscribe();
        this.onSend.unsubscribe();
        this.onError.unsubscribe();
    }

    public showSend(): boolean {
       return this.model.status === 'I' && this.model.sender === this.userService.user.id;
    }

    public showReceive(): boolean {
        return this.model.status === 'S' && this.model.receiver === this.userService.user.id;
    }

    public getStatus(): string {

        let status: string = '';

        switch (this.model.status) {
            case 'I':
                status = 'Iniciado';
                break;
            case 'S':
                status = 'Enviado';
                break;
            case 'R':
                status = 'Recebido';
                break;
            default:
                break;
        }

        return status;
    }

    public send(trackingCode: string) {

        if (!this.form.valid) {

            this.form.controls.trackingCode.markAsDirty();
            return;
        }

        this.model.trackingCode = this.form.controls.trackingCode.value;
        this.service.send(this.model);
    }

    public receive() {
        console.log('recebido!');
    }

    private configForm() {

        this.form = this.fb.group({
            trackingCode: ['', Validators.compose([Validators.required, CustomValidators.alphaNumeric()])]
        });
    }
}
