import { Component, OnDestroy, OnInit, ViewChild,  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import {Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm:NgForm;

  constructor(private shoppingService:ShoppingListService) { }
  subs : Subscription;
  editMode = false;
  editedItemIndex :number;
  editedItem: Ingredient;
  ngOnInit(): void {
    this.subs = this.shoppingService.startedEditing.subscribe((index:number)=>{
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingService.getIngredientsforEdit(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })

    })
  }



  onAddItem(f:NgForm){
    console.log(f);

    const value = f.value;

    const newIngredient : any = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingService.EditIngredient(this.editedItemIndex, newIngredient);
    }
    else this.shoppingService.addIngredients(newIngredient);

    this.editMode = false;
    f.reset();


  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

}
