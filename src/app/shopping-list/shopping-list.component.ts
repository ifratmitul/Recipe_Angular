import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as ShoppingListAction from './store/shopping-list.action';
import * as fromShoppingList from './store/shopping-list.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable <{ingredients:Ingredient[]}>;
  private igchange :Subscription;
  
  constructor(
    private shopingService: ShoppingListService,
    private store:Store<fromShoppingList.AppState> ) {

    }

  ngOnInit(): void {
      this.ingredients =this.store.select('shoppingList');

      // this.ingredients = this.shopingService.getIngredients();
      // this.igchange = this.shopingService.ingChanged.subscribe((ingredients:Ingredient[]) =>{
      //   this.ingredients =  ingredients;
      // })

  }

  ngOnDestroy(){
    // this.igchange.unsubscribe();
  }
  onEdit(index:number){

    // console.log(index);
    // this.shopingService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListAction.StartEdit(index));


  }

  onDelete(index: number){
   // this.shopingService.DeleteItem(index);
   this.store.dispatch(new ShoppingListAction.DeleteIngredient(index));
  }

}
