// --- IMPORT COMPONENTES ---
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// - Servicio para contener el JWT devuelto por el servidor
export class SessionVarService {

  private _jwtVarSubject: BehaviorSubject<string>=new BehaviorSubject<string>('');
  private _jwtVar:string;

  constructor() { }

  getToken():Observable<string>{
    return this._jwtVarSubject.asObservable();
  }

  setToken(_token:string){
    this._jwtVar = _token;
    this._jwtVarSubject.next(this._jwtVar);
  }
}
