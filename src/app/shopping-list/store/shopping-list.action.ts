import {Action} from '@ngrx/store'
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
     //payload is not a part of Action interface
     constructor(public payload: Ingredient) {
         
     }

}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {
        
    }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENTS;
    constructor(public payload:{index, ingredien:Ingredient}) {}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    constructor(public payload: number) {
        
    }
}

export type ShoppingListActions = AddIngredient 
                                | AddIngredients 
                                | UpdateIngredient
                                | DeleteIngredient;