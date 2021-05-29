// --- IMPORT COMPONENTES ---
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// - Servicio para contener el JWT devuelto por el servidor
export class SessionVarService implements OnDestroy {

  // - El token lo consultamos bajo demanda sin tener que retransmitir a otros componentes, teoricamente no hay necesidad de observable -
  // - Solo que delegarlo a un servicio mantenga persistencia
  private _jwtVarSubject: BehaviorSubject<string>=new BehaviorSubject<string>('');
  private _jwtVar:string;

  constructor() {
    this._jwtVarSubject.subscribe( (_subjectContent:string)=>_subjectContent=this._jwtVar );
  }

  ngOnDestroy(){
    console.log('El objeto de destruye');
  }

  public getToken():string{
    console.log('Se pide Token con valor ', this._jwtVarSubject.getValue());
    return this._jwtVarSubject.getValue();
    // console.log('Se pide Token con valor ', this._jwtVar);
    // return this._jwtVar;
  }

  public setToken(_token:string){
    this._jwtVar = _token;
    this._jwtVarSubject.next(this._jwtVar);
    console.log('Se mete token con valor ', this._jwtVarSubject.getValue());
    // console.log('Se mete token con valor ', this._jwtVar);
  }
}
