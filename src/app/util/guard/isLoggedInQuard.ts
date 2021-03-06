import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "../storage/storageService";

@Injectable({
    providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!StorageService.isLoggedIn()) {
            this.router.navigateByUrl('/');
            return false
        }
        return true
    }
}