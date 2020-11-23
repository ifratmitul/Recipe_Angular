import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/datastorage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';


@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorage:DataStorageService, private recipeService: RecipeService) {
        
    }
    
    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        const recipe = this.recipeService.getRecipes();
        if(recipe.length === 0) return this.dataStorage.fetchRecipes();
        return recipe;
    }

}