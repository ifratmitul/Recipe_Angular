import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

//const routes: Routes = [];

const appRoutes : Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path:'recipes', component: RecipesComponent, children:[
    {path:'', component: RecipeStartComponent },
    {path:'new', component: RecipeEditComponent },
    {path:':id', component: RecipeDetailComponent, resolve:[RecipeResolverService] },
  
    {path:':id/edit', component: RecipeEditComponent, resolve:[RecipeResolverService] },
  ]},
  {path:'shopping-list', component: ShoppingListComponent},
  {path:'auth', component: AuthComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
