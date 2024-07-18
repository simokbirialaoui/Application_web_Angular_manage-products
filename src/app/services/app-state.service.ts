import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productsState :any={
    products:[],
    keyword:"",
    currentPage : 1,
    pageSize:3,
    totalPages:0,
    status :"",
    totalProducts : 0,
    errorMessage :""
  }

  public authState:any={
    isAuthenticated :false,
    username:"",
    roles :[],
    token :"",
    // status :"",
    // errorMessage :"",
    // openaiKey:"YOUR API KEY"
  }
constructor() { }
public setProductState(state:any){
  //CREATE COPY
  this.productsState={...this.productsState, ...state}
}
public setAuthState(state:any){
  this.authState={errorMessage:"",...this.authState, ...state};
}



}
