import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  //ON AJOUTE $ POUR DIRE C'EST UNE VAR OBSERVABLE(POUR UTILISER FAUT FAIRE SUBCRIBE )
public isLoading$=new Subject<boolean>()
  constructor() { }
  showLoadingSpiner():void{
    this.isLoading$.next(true);
  }
  hideLoadingSpiner():void{
    this.isLoading$.next(false);
  }
}
