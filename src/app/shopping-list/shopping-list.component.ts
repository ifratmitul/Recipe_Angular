import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igchange :Subscription;
  constructor(private shopingService: ShoppingListService) {}

  ngOnInit(): void {
      this.ingredients = this.shopingService.getIngredients();
      this.igchange = this.shopingService.ingChanged.subscribe((ingredients:Ingredient[]) =>{
        this.ingredients =  ingredients;
      })

  }

  ngOnDestroy(){
    this.igchange.unsubscribe();
  }
  onEdit(index:number){

    console.log(index);
    this.shopingService.startedEditing.next(index);


  }

  onDelete(index: number){
    this.shopingService.DeleteItem(index);
  }

}
