import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { UserModel } from './user.model';
import { UsersService } from './users.service';
import { ValidateHelper } from '../../helpers/validate.helper';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    public form: FormGroup;

    constructor(public model: UserModel, private service: UsersService, fb: FormBuilder) {

        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, ValidateHelper.email()])],
            passwd: ['', Validators.required],
            confirmPasswd: ['', Validators.required]
        });
    }

     public register(): void {
        console.log(this.model);
     }
}
