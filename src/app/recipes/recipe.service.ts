import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Recipe} from './recipe.model';

import {ShoppingListService} from '../shopping-list/shopping-list.service'
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/datastorage.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
@Injectable()
export class RecipeService{


  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
    // private recipes: Recipe[] = [
    //     new Recipe(
    //       'Hello',
    //       'This is a description',
    //       'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg'
    //        ,[new Ingredient('Meat', 1),
    //        new Ingredient('French Fries', 50)]
    //       ),
    
    //     new Recipe(
    //       'Another one',
    //       'This is a description',
    //       'https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2019/09/iStock-1131794876.t5d482e40.m800.xtDADj9SvTVFjzuNeGuNUUGY4tm5d6UGU5tkKM0s3iPk-620x342.jpg',
    //       [
    //       new Ingredient('Meat', 5),
    //       new Ingredient('Fish', 1)
    //     ]),
    
    //   ];

      constructor(private shoppingService:ShoppingListService, 
                  private store:Store<{ shoppingList:{ingredients: Ingredient[]}}>
        ) {}

      getRecipes(){
          return this.recipes.slice();
      }
      addIngToShopping(ingredients:Ingredient[]){

       // this.shoppingService.addIngredient(ingredients);
        this.store.dispatch( new ShoppingListActions.AddIngredients(ingredients))
      }

      getRecipe(id:number){
        return this.recipes[id];
      }

      addRecipe(newRecipe: Recipe){

        this.recipes.push(newRecipe);

        this.recipeChanged.next(this.recipes.slice());
        

      }

      updateRecipe(index:number, newRecipe: Recipe){

        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice())
        




      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
      }


      setRecipeOver(recipe:Recipe[]){
        this.recipes = recipe;
        this.recipeChanged.next(this.recipes.slice());

      }

}