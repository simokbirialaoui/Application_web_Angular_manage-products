import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom, observable } from 'rxjs';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private appState :AppStateService) { }
  async login(username:string, password:string){
    let user:any=await firstValueFrom(this.http.get("http://localhost:3000/users/"+username));
  if(password==atob(user.password)){
    let decodeJWT:any=jwtDecode(user.token);
    this.appState.setAuthState({
      isAuthenticated:true,
      username :decodeJWT.sub,
      roles:decodeJWT.roles,
      token:user.token
    });
    return observable
    return Promise.resolve(true);
  }
  else
  {
    return Promise.reject("Bad Credentials"); 
  }
  }
}
