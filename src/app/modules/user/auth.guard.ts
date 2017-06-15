import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private service: UserService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // logged in so return true
        if (this.service.isLoggedIn())
            return true;

        // not logged in so redirect to landing page.
        this.router.navigate(['/']);
        return false;
    }
}
