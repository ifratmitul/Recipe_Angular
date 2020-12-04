import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {ADD_INGREDIENT} from './shopping-list.action'

const intialState = {
    ingredients:[
        new Ingredient('Apples', 5),
        new Ingredient('Bannana', 2),
      ]
};

export function shoppingListReducer(state = intialState, action:Action ){

        switch(action.type){
            case ADD_INGREDIENT:
                return {
                    ...state,
                    ingredients: [...state.ingredients, action]
                } 
        }



}