import { Component, OnInit } from '@angular/core';

import { UserModel } from './user.model';
import { UsersService } from './users.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {

    constructor(private user: UserModel, private service: UsersService) { }
}
