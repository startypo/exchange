import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../modules/user';

@Component({
    selector: 'xchs-header-auth',
    templateUrl: 'header.component.html',
    styleUrls: ['./style.scss', './header.component.css']
})
export class HeaderAuthComponent {

    constructor(public service: UserService, private router: Router) {}

    public logout() {
        this.service.logout();
    }

    public search(term: string) {
        this.router.navigate(['/assets/search', term]);
    }
}
