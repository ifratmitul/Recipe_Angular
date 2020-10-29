import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shopingService: ShoppingListService) {}

  ngOnInit(): void {
      this.ingredients = this.shopingService.getIngredients();
      this.shopingService.ingChanged.subscribe((ingredients:Ingredient[]) =>{
        this.ingredients =  ingredients;
      })

  }

//   onIngredientAdded(event:Ingredient){
// //event is the new ingredient
//     this.ingredients.push(event);

//   }
}
