import { Action } from 'rxjs/internal/scheduler/Action';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

const intialState = {
    ingredients:[
        new Ingredient('Apples', 5),
        new Ingredient('Bannana', 2),
      ]
};

export function shoppingListReducer(state = intialState, action: ShoppingListActions.ShoppingListActions ){

        switch(action.type){
            case ShoppingListActions.ADD_INGREDIENT:
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.payload]
                };
            case ShoppingListActions.ADD_INGREDIENTS:
                return{
                    ...state,
                    ingredients:[...state.ingredients, ...action.payload]
                }
            case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIng = { ...ingredient, ...action.payload.ingredien};
            const upgradedIng = [...state.ingredients];
            upgradedIng[action.payload.index] = updatedIng;    
            return{

                    ...state,
                    ingredients:upgradedIng
                }
            case ShoppingListActions.DELETE_INGREDIENT:
                    
            return{
                        ...state,
                        ingredients:state.ingredients.filter((ing, index) => { return index !== action.payload })
                    }
                
            default:
                return state;
        }



}