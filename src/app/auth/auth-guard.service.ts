import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CanActivate, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.isAuthenticate.pipe(map((authenticated) => {
            if (authenticated) {
                return true;
            } else {
                this.router.navigateByUrl('/signup');
            }
        }))
    }
}
