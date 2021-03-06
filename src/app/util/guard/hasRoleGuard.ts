import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "../storage/storageService";

@Injectable({
    providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!StorageService.isLoggedIn() || !StorageService.userHasRole(this.getResolvedUrl(route))) {
            this.router.navigateByUrl('/');
            return false
        }
        return true
    }

    getResolvedUrl(route: ActivatedRouteSnapshot): string {
        return route.pathFromRoot
            .map(v => v.url.map(segment => segment.toString()).join('/'))
            .join('/');
    }
}