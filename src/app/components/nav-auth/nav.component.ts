import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../modules/user';

@Component({
    selector: 'xchs-nav-auth',
    templateUrl: 'nav.component.html',
    styleUrls: ['./style.scss', 'nav.component.css']
})
export class NavAuthComponent {

    constructor(public service: UserService, private router: Router) {}

    public logout() {
        this.service.logout();
    }

    public search(term: string) {
        this.router.navigate(['/assets/search', term]);
    }
}
