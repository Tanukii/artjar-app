// --- Modulos importados
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  // - Constructor e inyeccion de clases
  constructor(
    private _http:HttpClient
  ) { }

  public Registrar(): Observable<any>{
    return this._http.post('http://localhost:3000/api/Registro',null);
  }
}
