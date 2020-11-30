import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { DropDownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
    declarations: [
        DropDownDirective,
        LoadingSpinnerComponent,
        PlaceholderDirective, 
        AlertComponent],

    imports:[
            
        CommonModule,
 
            
        ],

    exports:[

        DropDownDirective,
        LoadingSpinnerComponent,
        PlaceholderDirective, 
        AlertComponent,
        CommonModule,

    ],


})
export class SharedModule{

}