import { ɵDomAdapter } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { User } from './user.model';



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

    user = new BehaviorSubject<User>(null);

    

    constructor(private http:HttpClient, private router:Router) {
        
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
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
             this.user.next(user);

    }


}