import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Ingredient} from  '../shared/ingredient.model'
@Injectable()
export class ShoppingListService{
    ingChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Bannana', 2),
      ];


      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredientsforEdit(index:number){
        return this.ingredients[index];
      }

      addIngredients(ingredient:Ingredient){
          this.ingredients.push(ingredient);
          this.ingChanged.next(this.ingredients.slice())
      }

      addIngredient(ingredients:Ingredient[]){

        this.ingredients.push(...ingredients)
        this.ingChanged.next(this.ingredients.slice())
      }

      EditIngredient(index:number, newIng : Ingredient){

        this.ingredients[index] = newIng;
        this.ingChanged.next(this.ingredients.slice());

      }

      DeleteItem(index:number){
        this.ingredients.splice(index,1);
        this.ingChanged.next(this.ingredients.slice());
      }
    
}