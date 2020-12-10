
import { User } from '../user.model';
import * as AuthAction  from './auth.action';

export interface State {
    user: User

}

const initialState : State = {
    user: null,

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
                user :usr
            }

        case AuthAction.LOGOUT:
            return {
                ...state,
                user: null

            }
        default:
                return state;
    }


}