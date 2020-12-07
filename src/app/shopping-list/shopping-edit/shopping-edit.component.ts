import { Component, OnDestroy, OnInit, ViewChild,  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListAction from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm:NgForm;

  constructor(private shoppingService:ShoppingListService, 
    private store:Store<fromShoppingList.AppState>) { }

  subs : Subscription;
  editMode = false;
  editedItemIndex :number;
  editedItem: Ingredient;


  ngOnInit(): void {
   this.subs = this.store.select('shoppingList').subscribe( stateData => {
      if(stateData.editedIngIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        // this.editedItemIndex = stateData.editedIngIndex;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }else{
        this.editMode = false;
      }
    })

    // this.subs = this.shoppingService.startedEditing.subscribe((index:number)=>{
    //       this.editMode = true;
    //       this.editedItemIndex = index;
    //       this.editedItem = this.shoppingService.getIngredientsforEdit(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       })
    // this part is now done using Ngrx
    // })
  }



  onAddItem(f:NgForm){
    console.log(f);

    const value = f.value;

    const newIngredient : any = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      //this.shoppingService.EditIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListAction.UpdateIngredient(
          // index: this.editedItemIndex, 
          newIngredient ))

    }
    else{
      //this.shoppingService.addIngredients(newIngredient);
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    }

    this.editMode = false;
    f.reset();


  }




  onClear(){
    // this.slForm.reset();
    this.editMode = false;
    this.store.dispatch( new ShoppingListAction.StopEdit());
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
    this.store.dispatch( new ShoppingListAction.StopEdit());
  }

}
