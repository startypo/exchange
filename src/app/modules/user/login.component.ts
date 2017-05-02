import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { NotifyService } from '../ui/notify';
import { CustomValidators } from '../ui/validate';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {

    public form: FormGroup;

    constructor(private service: UserService, private fb: FormBuilder, private notifyService: NotifyService, private router: Router) {

        this.form = fb.group({
            email: ['', Validators.compose([Validators.required, CustomValidators.email()])],
            passwd: ['', Validators.required],
            rememberMe: ['']
        });
    }

    public submit(form: FormGroup): void {

        if (!form.valid) {

            Object.keys(form.controls).forEach(key => {
                form.get(key).markAsDirty();
            });

            return;
        }

        form.valueChanges.subscribe(() => this.notifyService.removeAll());

        this.service.login(form.value).subscribe(() => {
            this.router.navigate(['/assets']);
        },
        (err) => {
            if (err.status === 401)
                this.notifyService.error('XChanges', 'E-mail address or password are incorrect.');
        });
    }
}
