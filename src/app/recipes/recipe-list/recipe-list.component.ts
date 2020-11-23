import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/datastorage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes:Recipe[];
  subs: Subscription;

  constructor(private recipeService:RecipeService, private router: Router, private route
    :ActivatedRoute, private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subs=this.recipeService.recipeChanged.subscribe((recipes:Recipe[]) =>{
        this.recipes = this.recipeService.getRecipes();
    })

    this.onFetch();

  }

  onNew()
  {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  // onSave(){
  //   this.dataStorageService.storeRecipes();

  // }

  onFetch(){
      this.dataStorageService.fetchRecipes().subscribe();
  }
  
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
