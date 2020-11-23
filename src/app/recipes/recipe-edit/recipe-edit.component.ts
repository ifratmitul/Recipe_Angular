import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/datastorage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeFrom: FormGroup
  constructor(private route:ActivatedRoute, 
    private router:Router, private recipeService : RecipeService, private dataStorage:DataStorageService) { }

  ngOnInit(): void {

    this.route.params.subscribe((param:Params) =>{
          this.id = +param['id'];
          this.editMode = param['id']!= null;
          console.log(this.editMode);
          this.initForm();
    })
  }


  private initForm(){
    let recipeName = '';
    let recipeImg = '';
    let recipeDes = '';
    let recipeIng = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imgPath;
      recipeDes = recipe.description;
      console.log(recipe);
      if(recipe['ingredients']){
        for(let ing of recipe.ingredients){
          recipeIng.push(
            new FormGroup({
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }

    }

    this.recipeFrom = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),

      'description': new FormControl(recipeDes, Validators.required),
      'imagePath' : new FormControl (recipeImg, Validators.required),
      'ingredients' : recipeIng


      
    })

  }

  onSubmit(){
const newRecipe = new Recipe(
  this.recipeFrom.value['name'],
  this.recipeFrom.value['description'],
  this.recipeFrom.value['imagePath'],
  this.recipeFrom.value['ingredients']);
  
  if(this.editMode){
    this.recipeService.updateRecipe(this.id, newRecipe )
    this.dataStorage.storeRecipes();
  }
  else 
  {
    this.recipeService.addRecipe(newRecipe)
    this.dataStorage.storeRecipes();
  }
  this.onCancel();

  }

  get controls() { // a getter!
    return (<FormArray>this.recipeFrom.get('ingredients')).controls;
  }

  addIngredients(){
    (<FormArray>this.recipeFrom.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    )
    
  }

  onCancel(){

    this.router.navigate(['../'], {relativeTo: this.route});

  }
 

  onDeleteIng(i:number){
    (<FormArray>this.recipeFrom.get('ingredients')).removeAt(i);

  }

}
