import { Component } from '@angular/core';
import { UserService } from '../../modules/user';

@Component({
    selector: 'nav-menu',
    templateUrl: 'nav-menu.component.html',
    styleUrls: ['nav-menu.component.css']
})
export class NavMenuComponent {

    constructor(public service: UserService) {}

    public logout() {
        this.service.logout();
    }
}
