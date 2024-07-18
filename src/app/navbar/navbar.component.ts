import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { AppStateService } from '../services/app-state.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  actions : Array<any> =[
    {title :"Home", "route":"/admin/home", icon : "house"},
    {title :"Products", "route":"/admin/products", icon : "search"},
    {title :"New Product", "route":"/admin/newProduct", icon : "safe"}
  ];
  currentAction :any;
  public isLaoding :boolean=false;
constructor(public appState:AppStateService,public loadingService:LoadingService,public router:Router){
  this.loadingService.isLoading$.subscribe({
    next:(value)=>{
      this.isLaoding=value;
    }
  })
}
  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  logout() {
    this.appState.authState={};
    this.router.navigateByUrl("/login");
    }

    login() {
      this.router.navigateByUrl("/login")
      }
}
