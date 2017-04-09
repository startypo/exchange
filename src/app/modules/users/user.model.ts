import { Injectable } from '@angular/core';
import { IUser } from '../../../domain.interfaces';

@Injectable()
export class UserModel implements IUser {

    public id: number = 0;
    public name: string = '';
    public email: string = '';
    public passwd: string = '';
    public confirmPasswd: string = '';
    public profile: string = '';
}
