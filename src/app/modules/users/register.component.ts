import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModel } from './user.model';
import { UsersService } from './users.service';


@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent {

    public model: UserModel;

    constructor(private fb: FormBuilder, private service: UsersService, private router: Router) {

        this.model = new UserModel(fb);
    }

    public alert() {}

    public submit(form: FormGroup): void {

        if (!form.valid) {

            Object.keys(form.controls).forEach(key => {
                form.get(key).markAsDirty();
            });

            return;
        }

        this.service.register(form.value).subscribe((res) => {

            if (res.ok)
                this.router.navigate(['login']);
            else
                this.alert();
        }, (err) => null);
    }
}
