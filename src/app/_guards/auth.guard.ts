import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { USER_ROLE } from '../_models/user-role.enum';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}
    get userRole():USER_ROLE {
        return this.authService.currentUser?.role;
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
            console.log(this.userRole,childRoute.data['role']);
            
        if (this.userRole != childRoute.data['role']) {
            return false;
        } else {
            return true;
        }
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
           
        console.log(this.userRole,route);
        if (!this.isUserAuthenticated()) {
            return this.router.createUrlTree([`${route.data['redirectionPath']}`]);
        }
        if (!(this.userRole == route.data.role)) {
            return false;
        } else {
            return true;
        }
    }

    private isUserAuthenticated() {
        return this.authService.isLoggedIn;
    }

}
