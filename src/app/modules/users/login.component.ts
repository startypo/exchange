import { Component, OnInit } from '@angular/core';

import { UserModel } from './user.model';
import { UsersService } from './users.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    constructor(private user: UserModel, private service: UsersService) { }
}
