import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';

//const routes: Routes = [];

const appRoutes : Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  


]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
