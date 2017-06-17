import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../modules/user';
import { EventService } from '../../services/event.service';

@Component({
    selector: 'xchs-header-auth',
    templateUrl: 'header.component.html',
    styleUrls: ['./style.scss', './header.component.css']
})
export class HeaderAuthComponent {

    constructor(public service: EventService, public userService: UserService, private router: Router) {}

    public logout() {
        this.userService.logout();
        this.router.navigate(['/']);
    }

    public search(term: string) {
        this.router.navigate(['/assets/search', term]);
    }
}
