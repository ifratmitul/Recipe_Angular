import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { pipe } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataStorageService{
    constructor(private http:HttpClient, private recipeService: RecipeService,
         private authService:AuthService) {
        
    }

    storeRecipes(){

        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-angular-fc719.firebaseio.com/recipes.json', recipes)
        .subscribe(response =>{

            console.log(response)

        });

    }

    fetchRecipes(){
        //This code is for if we want to only allow logged in user to see the DB.
        
        return this.http.get<Recipe[]>('https://recipe-angular-fc719.firebaseio.com/recipes.json')
       .pipe(
            map(recipe =>{
            return recipe.map(recipe =>{
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            });
        }),
        tap(recipe =>{
            this.recipeService.setRecipeOver(recipe)
        })
        );

        /*
        return this.http.get<Recipe[]>('https://recipe-angular-fc719.firebaseio.com/recipes.json')
        .pipe(map(recipe =>{
            return recipe.map(recipe =>{
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            });
        }),
        tap(recipe =>{
            this.recipeService.setRecipeOver(recipe)
        })
        ) */

    }




}