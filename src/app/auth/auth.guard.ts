import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{

    constructor(private AuthS:AuthService, private router :Router) {
        
    }
    canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot): boolean |  Observable<boolean | UrlTree> |  Promise<boolean | UrlTree> {
        
        return this.AuthS.user.pipe(
            take(1),
            map(user =>
            {
                const isAuth = !!user;
                if(isAuth) return true;

                return this.router.createUrlTree(['/auth']);
            }))     


    }






}