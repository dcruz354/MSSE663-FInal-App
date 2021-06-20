import { Observable } from 'rxjs';
import { AuthService } from './../_services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        public router: Router,
        public authService: AuthService
    ) {}

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        if(!this.authService.isLoggedIn) {
            window.alert('Access not allowed! Please log in!');
            this.router.navigate(['/login']);
        }   

        return true;
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     const user = this.authService.userValue;
    //     if(user) {
    //         return true;
    //     }

    //     this.router.navigate(['/login']);
    //     return false;
    // }
}