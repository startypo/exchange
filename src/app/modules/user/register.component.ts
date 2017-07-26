import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { NotifyService } from '../ui/notify';
import { CustomValidators } from '../ui/validate';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css', 'style.scss']
})
export class RegisterComponent {

    public form: FormGroup;

    constructor(private service: UserService, private notify: NotifyService, private router: Router, private fb: FormBuilder) {

        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, CustomValidators.email()])],
            passwd: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
            confirmPasswd: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
        });
    }

    public submit(): void {

        if (!this.form.valid) {

            Object.keys(this.form.controls).forEach(key => {
                this.form.get(key).markAsDirty();
            });

            return;
        }

        this.form.valueChanges.subscribe(() => this.notify.removeAll());

        this.service.register(this.form.value).subscribe(
            (res) => this.router.navigate(['/login']),
            (err) => {
                if (err.status === 403)
                    this.notify.error('XChanges', 'E-mail é inválido ou já existe no sistema.');
                else
                    this.router.navigate(['/error']);
            },
            () => this.notify.success('XChanges', 'O usuário foi cadastrado com sucesso.')
        );
    }
}
