import { ɵDomAdapter } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthAction from './store/auth.action';




export interface AuthResponseData{
    
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;

}

@Injectable({
    providedIn:'root'
})

export class AuthService {

    //user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    

    constructor(
         private http:HttpClient,
         private router:Router,
         private store:Store<fromApp.AppState>) {
        
    }

    logout(){
        //this.user.next(null);
        this.store.dispatch(new AuthAction.Logout());
        localStorage.removeItem('userData');

        this.router.navigate(['/auth']);
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;

    }


    autoLogout(expirationDuration:number){

        this.tokenExpirationTimer =  setTimeout(() =>{
              this.logout();
          }, expirationDuration)
  
      }

    signUp(email:string, password:string){

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzPED_KFtXun8NdNIclGRbqgTTcYtvhMM',
        {
            email:email,
            password: password,
            returnSecureToken:true

        })
        .pipe(catchError(this.handleError));

    }


    login(email:string, password:string){



        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzPED_KFtXun8NdNIclGRbqgTTcYtvhMM',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError),tap(resdata =>{
            this.handleAuthentication(
                 resdata.email,
                 resdata.localId, 
                 resdata.idToken,
                +resdata.expiresIn)
        }));

    }

    private handleError(err:HttpErrorResponse){
        let error = 'An unknown error occured'
        if(err.error ||  !err.error.error){
            return throwError(error);

        }
        switch(err.error.error.message){
            case 'EMAIL_EXISTS':
                error = 'This email already have an account';
        }
        return throwError(error);

    }

    private handleAuthentication(email:string,userId:string, token:string, expiresIn:number){

        const expirationDate= new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId,
             token, expirationDate);

            //  this.user.next(user);
            this.store.dispatch(new 
                AuthAction.Login( {
                      email:email,
                      userId:userId,
                      token:token,
                      expirationDate:expirationDate}))

             this.autoLogout(expiresIn * 1000);
             localStorage.setItem('userData',JSON.stringify(user))

    }

    autologin(){
        const userData : {
            
            email:string;
            id:string;
            _token:string;
            _tokenExpirationDate:string;
    
        } = JSON.parse(localStorage.getItem('userData'))
        if(!userData) return;

        const loadedUser= new User(userData.email,
             userData.id, userData._token, new Date(userData._tokenExpirationDate));

             if(loadedUser.token){

                //  this.user.next(loadedUser);
                this.store.dispatch( 
                    new AuthAction.Login({email: loadedUser.email,
                     userId: loadedUser.id,
                     token: loadedUser.token, 
                     expirationDate:new Date(userData._tokenExpirationDate) }))

                 const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                 this.autoLogout(expDuration);
             }

    }



}