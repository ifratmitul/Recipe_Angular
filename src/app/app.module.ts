import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import {HttpClientModule} from '@angular/common/http';


import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { RecipesModule } from './recipes/recipes.module';



@NgModule({
  declarations: [
     AppComponent,
     HeaderComponent, 

     ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 

    HttpClientModule,
    
    SharedModule,
    CoreModule,
    RecipesModule


    
  ],
  

  
    bootstrap: [AppComponent],

})
export class AppModule {}
