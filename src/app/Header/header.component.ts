import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
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

  constructor(private authService:AuthService) 
  {
  }

  ngOnInit(){
    this.userSub= this.authService.user.subscribe(user =>{
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
