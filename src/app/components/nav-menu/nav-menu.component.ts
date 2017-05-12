import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../modules/user';


@Component({
    selector: 'nav-menu',
    templateUrl: 'nav-menu.component.html',
    styleUrls: ['nav-menu.component.css']
})
export class NavMenuComponent {

    constructor(public service: UserService, private router: Router) {}

    public logout() {
        this.service.logout();
    }

    public search(term: string) {

        this.router.navigate(['/assets/search', term]);
    }
}
