import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules} from '@angular/router';




//const routes: Routes = [];

const appRoutes : Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  
  // Commented the lazzy loading for recipe element, some where in recipe comp, router has been called need to check.
  //{
  //   path: 'recipes', 
  //   loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule),
    
  // },

  {
    path:'shopping-list',
    loadChildren: () => import('./shopping-list/Shopping.module').then(m=>m.ShoppingModule)
  }
  ,
  {
    path: 'auth',
    loadChildren: () => import ('./auth/auth.module').then(m=>m.AuthModule)
  }
  


]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{ preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})




export class AppRoutingModule { }
