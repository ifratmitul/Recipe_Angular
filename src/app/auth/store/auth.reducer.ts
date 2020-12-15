
import { sample } from 'rxjs/operators';
import { User } from '../user.model';
import * as AuthAction  from './auth.action';

export interface State {
    user: User;
    authError: string;
    loading: boolean;

}

const initialState : State = {
    user: null,
    authError : null,
    loading: false

}

export function AuthReducer(state = initialState, action:AuthAction.AuthActions){

    switch(action.type){
        case AuthAction.LOGIN:
            const usr = new User(
                action.payload.email, 
                action.payload.userId, 
                action.payload.token, 
                action.payload.expirationDate );
            return {
                ...state,
                user :usr,
                loading: false
            }

        case AuthAction.LOGOUT:
            return {
                ...state,
                user: null, 
                loading:false

            }
        case AuthAction.LOGIN_START:
        case AuthAction.SIGNUP_START:
            return{
                ...state,
                authError: null,
                loading: true
            }
        case AuthAction.LOGIN_FAIL:
            return{
                ...state,
                authError: action.payload,
                loading: false
            }
        case AuthAction.CLEAER_ERROR:
            return{
                ...state,
                authError: null

            }

        default:
                return state;
    }


}