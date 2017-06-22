import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../modules/user';

@Component({
    selector: 'xchs-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['./style.scss', './footer.component.css']
})
export class FooterComponent {

    constructor(public service: UserService, private router: Router) {}

    public logout() {
        this.service.logout();
    }

    public search(term: string) {
        this.router.navigate(['/assets/search', term]);
    }
}
