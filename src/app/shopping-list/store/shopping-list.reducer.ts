import { Action } from 'rxjs/internal/scheduler/Action';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';


export interface AppState{
    shoppingList: State;
}
export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngIndex: number;
}
const intialState:State = {
    ingredients:[
        new Ingredient('Apples', 5),
        new Ingredient('Bannana', 2),
      ],
      editedIngredient: null,
      editedIngIndex: -1
};

export function shoppingListReducer(state:State = intialState,
     action: ShoppingListActions.ShoppingListActions ){

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
                const ingredient = state.ingredients[state.editedIngIndex];
                const updatedIng = { ...ingredient, ...action.payload};
                const upgradedIng = [...state.ingredients];
                upgradedIng[state.editedIngIndex] = updatedIng;    
                return{

                        ...state,
                        ingredients:upgradedIng, 
                        editedIngIndex:-1,
                        editedIngredient: null
                    }


            case ShoppingListActions.DELETE_INGREDIENT:
                    
            return{
                        ...state,
                        ingredients:state.ingredients.filter((ing, index) => { 
                            return index !== state.editedIngIndex })
                    }

            case ShoppingListActions.START_EDIT:
                return{
                    
                    ...state,
                    editedIngIndex: action.payload,
                    editedIngredient: {...state.ingredients[action.payload]}
                    

                }
            case ShoppingListActions.STOP_EDIT:
                return {
                    ...state,
                    editedIngIndex : -1,
                    editedIngredient : null

                }
                
            default:
                return state;
        }



}