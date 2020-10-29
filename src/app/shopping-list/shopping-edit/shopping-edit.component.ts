import { EventEmitter,Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  @ViewChild('nameInput',{static: false})  nameInputref: ElementRef;
  @ViewChild('amountInput',{static: false})  amountInputref: ElementRef;
  //@Output() ingredientAdded = new EventEmitter<{Ingredient:any}>();
  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd(){

    const ingName = this.nameInputref.nativeElement.value;
    const ingAmount = this.amountInputref.nativeElement.value;
    const newIngredient : any = new Ingredient(ingName, ingAmount);
    //this.ingredientAdded.emit(newIngredient);
    this.shoppingService.addIngredients(newIngredient);

  }

}
