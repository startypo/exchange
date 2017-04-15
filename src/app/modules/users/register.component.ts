import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { UserModel } from './user.model';
import { UsersService } from './users.service';
import { ValidateHelper } from '../../helpers/validate.helper';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent {

    public form: FormGroup;
    public loading: boolean = false;

    @Output() public registred = new EventEmitter();

    constructor(public model: UserModel,
                private service: UsersService,
                private fb: FormBuilder) {

        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, ValidateHelper.email()])],
            passwd: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
            confirmPasswd: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
        });
    }

    public register(): void {

        this.loading = true;

        this.service.register(this.model).subscribe((res) => {
            this.registred.emit();
            this.loading = false;
        }, (err) => {
            console.log(err);
            this.loading = false;
        } );
    }
}
