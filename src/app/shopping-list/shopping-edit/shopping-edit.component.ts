import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  @ViewChild('nameInput',{static: false})  nameInputref: ElementRef;
  @ViewChild('amountInput',{static: false})  amountInputref: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){

  }

}
