import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';



import { RecipesModule } from './recipes/recipes.module';
import { ShoppingModule } from './shopping-list/Shopping.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [AppComponent,
     HeaderComponent, 

     ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 

    HttpClientModule,
    RecipesModule,
    ShoppingModule,
    AuthModule,
    SharedModule,
    CoreModule,

    
  ],
  

  
    bootstrap: [AppComponent],

})
export class AppModule {}
