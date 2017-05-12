import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { NotifyService } from '../ui/notify';
import { CustomValidators } from '../ui/validate';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
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

    public submit(form: FormGroup): void {

        if (!form.valid) {

            Object.keys(form.controls).forEach(key => {
                form.get(key).markAsDirty();
            });

            return;
        }

        form.valueChanges.subscribe(() => this.notify.removeAll());

        this.service.register(form.value).subscribe(
            (res) => this.router.navigate(['/login']),
            (err) => {
                if (err.status === 403)
                    this.notify.error('XChanges', 'E-mail is invalid or already taken.');
                else
                    this.notify.error('XChanges', 'Something went wrong.');
            },
            () => this.notify.success('XChanges', 'User successfully registered.')
        );
    }
}
