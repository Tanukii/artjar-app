// --- IMPORT COMPONENTES ---
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// - Import Interface -
import { IToken } from 'src/app/models/tokenModel';

@Injectable({
  providedIn: 'root'
})

// - Servicio para contener el JWT devuelto por el servidor
export class SessionVarService {

  // - Vars de control para partes estaticas del token -
  private _userVarSubject: BehaviorSubject<Object>=new BehaviorSubject<Object>({});
  private _userVar:Object;

  // - Vars de control para  partes dnamicas del token (Primariamente los "Exposure Bucks") -
  private _exposureVarSubject: BehaviorSubject<Object>=new BehaviorSubject<Object>({});
  private _exposureVar:Object;

  // - Var para JWT -
  private _jwtVarSubject: BehaviorSubject<string>=new BehaviorSubject<string>('');
  private _jwtVar:string;

  // - Var para STATUS -
  private _statusVarSubject: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  //private _statusVar:boolean;

  constructor() {
    this._userVarSubject.subscribe( (_subjectContent:Object)=>_subjectContent=this._userVar );
    this._exposureVarSubject.subscribe( (_subjectContent:Object)=>_subjectContent=this._exposureVar );
    this._jwtVarSubject.subscribe( (_subjectContent:string)=>_subjectContent=this._jwtVar );
    //this._statusVarSubject.subscribe( (_subjectContent:boolean)=>_subjectContent=this._statusVar );
  }

  // - Metodo para cargar variables con la respuesta de la Api -
  public setTokenFromREST(_restToken: IToken){
    if(_restToken !== null){
      // - Carga UserVar -
    this._userVar = {
      idUser: _restToken.userData.idUser,
      nickname: _restToken.userData.nickname,
      tier: _restToken.userData.tier
    };
    this._userVarSubject.next(this._userVar);

    // - Carga ExposureVar -
    this._exposureVar = {
      exBucks: _restToken.userData.exBucks
    };
    this._exposureVarSubject.next(this._exposureVar);

    // - Carga JwtVar -
    this._jwtVar = _restToken.jwt;
    this._jwtVarSubject.next(this._jwtVar);
    }
    

    // - Carga Status -
    _restToken !== null ? this._setStatus(true) : this._setStatus(false);

  }

  // - Get JWT -
  public getJwt():string{
    return this._jwtVarSubject.getValue();
  }

  // - Get User -
  public getUser():Object{
    return this._userVarSubject.getValue();
  }

  // - Get Exposure Bucks -
  public getExBucks():Observable<Object>{
    return this._exposureVarSubject.asObservable();
  }

  // - Set Exposure Bucks, Va a cambiar puesto que es la unidad monetaria -
  public setExBucks(_exB:number){
    this._exposureVar = {
      exBucks: _exB
    };
    this._exposureVarSubject.next(this._exposureVar);
  }

  // - Get Status, para saber si se ha cargado la variable o no -
  public getStatus():Observable<boolean>{
    return this._statusVarSubject.asObservable();
  }

  // - Set Status para uso interno del servicio -
  private _setStatus(_status:boolean){
    _status ? this._statusVarSubject.next(true) : this._statusVarSubject.next(false);
  }

  
}
