import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { NotifyService } from '../ui/notify';
import { CustomValidators } from '../ui/validate';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css', 'style.scss']
})
export class LoginComponent {

    public form: FormGroup;

    constructor(private service: UserService, private notify: NotifyService, private router: Router, private fb: FormBuilder) {

        this.form = fb.group({
            email: ['', Validators.compose([Validators.required, CustomValidators.email()])],
            passwd: ['', Validators.required],
            rememberMe: ['']
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

        this.service.login(this.form.value).subscribe(() => {
            this.router.navigate(['/main']);
        },
        (err) => {
            if (err.status === 401)
                this.notify.error('Exchange', 'O e-mail ou a senha estão incorretos.');
            else
                this.router.navigate(['/error']);
        });
    }
}
