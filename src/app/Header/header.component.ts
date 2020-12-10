import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy{
  title: string = 'Recipe Angular';
  subTitle: string = 'Learning Angular !';

  private userSub : Subscription;
  isAuthenticated = false;

  constructor(private authService:AuthService, private store:Store<fromApp.AppState>) 
  {
  }

  ngOnInit(){
    this.userSub= this.store.select('auth').pipe(map(authstate =>
      authstate.user))
      .subscribe(user =>{
      //console.log(user);
      console.log(!user);
      console.log(!!user);
      this.isAuthenticated = !!user;
      console.log(this.isAuthenticated);
    });

  }
  onLogout(){

    this.authService.logout();

  }

  ngOnDestroy(){
   this.userSub.unsubscribe();
  }


}
