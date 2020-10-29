import { EventEmitter, Injectable, Output } from '@angular/core';
import {Ingredient} from  '../shared/ingredient.model'
@Injectable()
export class ShoppingListService{
    ingChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Bannana', 2),
      ];


      getIngredients(){
          return this.ingredients.slice();
      }

      addIngredients(ingredient:Ingredient){
          this,this.ingredients.push(ingredient);
          this.ingChanged.emit(this.ingredients.slice())
      }

      addIngredient(ingredients:Ingredient[]){

        this.ingredients.push(...ingredients)
        this.ingChanged.emit(this.ingredients.slice())
      }
    
}