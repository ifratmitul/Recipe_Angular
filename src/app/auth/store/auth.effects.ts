import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions , Effect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as AuthAction from './auth.action';

export interface AuthResponseData{
    
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;

}

@Injectable()
export class AuthEffect{
    constructor(private action$:Actions, private http: HttpClient, private router:Router) {}

    @Effect()
    authlogin= this.action$.pipe(
        ofType(AuthAction.LOGIN_START),
        
        switchMap((authData: AuthAction.Loginstart) => {
            return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzPED_KFtXun8NdNIclGRbqgTTcYtvhMM',
            {
                email:authData.payload.email,
                password:authData.payload.password,
                returnSecureToken:true
            })
            .pipe(
                map( resData => {
                    const expirationDate= new Date(new Date().getTime() + +resData.expiresIn * 1000);
                   return new AuthAction.Login({
                       email:resData.email, 
                       userId:resData.localId,
                       token: resData.idToken,
                       expirationDate: expirationDate});
                })  ,
                
            catchError(errorRes =>{
                let errorMessage = 'An unknown error occurred!';
                if (!errorRes.error || !errorRes.error.error) {
                  return of(new AuthAction.LoginFail(errorMessage));
                }
                switch (errorRes.error.error.message) {
                  case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already';
                    break;
                  case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exist.';
                    break;
                  case 'INVALID_PASSWORD':
                    errorMessage = 'This password is not correct.';
                    break;
                }
                return of(new AuthAction.LoginFail(errorMessage));
            }), 

        );
        
    })
    )
    @Effect({dispatch:false})
    authSuccess = this.action$.pipe(ofType(AuthAction.LOGIN), 
    tap(() =>{
        this.router.navigate(['/'])
    })
    )
    
}