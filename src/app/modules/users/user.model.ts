import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateHelper } from '../ui/validate';

@Injectable()
export class UserModel {

    public id: string = '';
    public name: string = '';
    public email: string = '';
    public passwd: string = '';
    public confirmPasswd: string = '';
    public profile: string = '';

    public form: FormGroup;

    constructor(private fb: FormBuilder) {

        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, ValidateHelper.email()])],
            passwd: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
            confirmPasswd: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
        });
    }
}
