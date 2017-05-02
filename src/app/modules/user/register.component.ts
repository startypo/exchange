import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

    constructor(private service: UserService, private notifyService: NotifyService, private fb: FormBuilder) {

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

        form.valueChanges.subscribe(() => this.notifyService.removeAll());

        this.service.register(form.value).subscribe((res) => {

            form.reset();
            this.notifyService.success('XChanges', 'User successfully registered.');
        },
        (err) => {
            if (err.status === 403)
                this.notifyService.error('XChanges', 'E-mail is invalid or already taken.');
        });
    }
}
