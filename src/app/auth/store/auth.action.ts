import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN = '[Auth] LOGIN';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] LOGOUT';
export const SIGNUP_START = '[Auth] SignUp Start';
export const CLEAER_ERROR = '[Auth] Clear Error' ;


export class Login implements Action{

    readonly type =  LOGIN;
    constructor(public payload : {
         email: string,
         userId:string,
         token:string,
         expirationDate:Date }) 
         {}

}


export class Logout implements Action {
    readonly type = LOGOUT;


}
export class Loginstart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload:{email:string, password: string}) {
        
    }

}
export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload : string) {
        
    }
}
export class Singup implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload :{email : string, password: string}) {
        
    }
}

export class ClearError implements Action {
    readonly type = CLEAER_ERROR;
}
export type AuthActions = Login | Logout | Loginstart | LoginFail | Singup | ClearError;