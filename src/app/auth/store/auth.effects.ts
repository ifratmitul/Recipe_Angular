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

const handleAuthentication = (expiresIn : number, email: string, localId:string, token:string) => {
    const expirationDate= new Date(new Date().getTime() + +expiresIn * 1000);
    return new AuthAction.Login({
        email:email, 
        userId:localId,
        token:token,
        expirationDate: expirationDate});
};

const handleError = (errorRes) => {
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
}

@Injectable()
export class AuthEffect{
    constructor(private action$:Actions, private http: HttpClient, private router:Router) {}

    @Effect()
    authSignup = this.action$.pipe(
        ofType(AuthAction.SIGNUP_START),
        switchMap((signupStart:AuthAction.Singup)=>{
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzPED_KFtXun8NdNIclGRbqgTTcYtvhMM',
            {
                email: signupStart.payload.email,
                password: signupStart.payload.password,
                returnSecureToken:true
    
            }
            )
            .pipe(
                map( resData => {
                  return handleAuthentication(
                      +resData.expiresIn, 
                      resData.email, 
                      resData.localId, 
                      resData.idToken)
                })  ,
                
            catchError(errorRes =>{
                    return handleError(errorRes);
            }), 

        );
        })
    )
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
                    return handleAuthentication(
                        +resData.expiresIn, 
                        resData.email, 
                        resData.localId, 
                        resData.idToken) 
                     }),
                
            catchError(errorRes =>{
               return handleError(errorRes)
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