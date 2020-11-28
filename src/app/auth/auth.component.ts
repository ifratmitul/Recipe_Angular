import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { catchError, exhaustMap, take } from 'rxjs/operators';
import { AlertComponent } from '../shared/alert/alert.component';
import { DataStorageService } from '../shared/datastorage.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy{

    private closeSub: Subscription


    isLoginMode = true;
    isLoading = false;
    error:string = null;
    @ViewChild(PlaceholderDirective, {static:false}) alertHost: PlaceholderDirective;


    constructor(private authService: AuthService, 
        private router:Router, private dataStorage:DataStorageService,
        private componentFactory:ComponentFactoryResolver) {
        
    }
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnDestroy(){
        if(this.closeSub) this.closeSub.unsubscribe();
    }

    onSubmit(form:NgForm){

        if(!form.valid){

            return;

        }
        const email = form.value.email;
        const password = form.value.password;
        
        let authObs:Observable<AuthResponseData>;
        this.isLoading = true;

        if (this.isLoginMode){
           authObs = this.authService.login(email, password)

        }
        else{
            authObs = this.authService.signUp(email, password)
        }

        authObs.subscribe(respinse =>{
            console.log(respinse);    
            this.isLoading = false;
            this.router.navigate(['/recipes'])
            
        }, 
        errormsg =>{
            console.log(errormsg);
            this.error = errormsg;
            this.showAlert(errormsg);
            this.isLoading = false;
        });

        form.reset();
    }

    handleError(){
        this.error= null;
    }

    private showAlert(errMsg:string){
       const alertcmpFac= this.componentFactory.resolveComponentFactory(
           AlertComponent);

           const hostViewContainerRef = this.alertHost.viewContainerRef;
           hostViewContainerRef.clear();

         const compRef =  hostViewContainerRef.createComponent(alertcmpFac);
         compRef.instance.message = errMsg;
         this.closeSub = compRef.instance.close.subscribe(() =>{
                this.closeSub.unsubscribe();
                hostViewContainerRef.clear();
         })

        
            
    }

}