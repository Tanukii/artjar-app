// --- Modulos importados
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// --- Interfaces Importadas
import { IUsuario } from 'src/app/models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class LogSignService {

  // - Constructor e inyeccion de clases
  constructor(
    private _http:HttpClient
  ) { }

  // --- METODOS DEL SERVICIO ---

  // - Metodo de Registro -
  public Registrar(_newUser:IUsuario): Observable<any>{
    return this._http.post('http://localhost:3000/api/Registro',_newUser);
  }

  // - Metodo Check Nickname en uso -
  public CheckNickname(_nick:String): Observable<any>{
    return this._http.get(`http://localhost:3000/api/CheckNickname/${_nick}`,{observe:'response'});
  }

  public CheckLoged(_token:string): Observable<any>{
    let _jwtContainer={jwt: _token};
    return this._http.post('http://localhost:3000/api/CheckLoged/',_jwtContainer);
  }

  // - Metodo LogIn -
  public LogIn(_logUser:IUsuario): Observable<any>{
    return this._http.post('http://localhost:3000/api/Login/',_logUser,{observe:'response'});
  }
}
