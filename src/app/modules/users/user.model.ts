import { Injectable } from '@angular/core';

@Injectable()
export class UserModel {

    public id: number = 0;
    public name: string = '';
    public email: string = '';
    public passwd: string = '';
    public confirmPasswd: string = '';
    public profile: string = '';
}
