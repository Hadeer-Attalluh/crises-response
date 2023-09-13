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
    get userRoles() {
        return this.authService.currentUser?.roles;
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        if (!this.isUserAuthorized(childRoute.data['roles'])) {
            return this.router.createUrlTree(['']);
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
        if (!this.isUserAuthenticated()) {
            return this.router.createUrlTree(['/login']);
        }
        if (!this.isUserAuthorized(route.data['roles'])) {
            return this.router.createUrlTree(['user-profile']);
        } else {
            return true;
        }
    }

    private isUserAuthenticated() {
        return this.authService.isLoggedIn;
    }

    private isUserAuthorized(
        authorizedUserRoles: USER_ROLE[],
        matchAllRoles?: boolean
    ) {
        if (!authorizedUserRoles) return true;
        if (matchAllRoles) {
            return this.matchAllRoles(authorizedUserRoles);
        }
        return this.matchSomeRoles(authorizedUserRoles);
    }

    private matchAllRoles(roles: USER_ROLE[]) {
        let roleMatching = true;
        for (let role of roles) {
            roleMatching = roleMatching && this.userRoles.includes(role);
            if (!roleMatching) {
                return roleMatching;
            }
        }
        return roleMatching;
    }

    private matchSomeRoles(roles:USER_ROLE[]) {
        let roleMatching = false;
        for (const role of roles) {
            roleMatching = roleMatching || this.userRoles.includes(role);
            if (roleMatching) {
                return roleMatching;
            }
        }
        return roleMatching;
    }
}
