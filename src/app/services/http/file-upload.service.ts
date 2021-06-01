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
export class FileUploadService {

  // - Constructor e inyeccion de clases
  constructor(
    private _http:HttpClient
  ) { }

  // --- METODOS DEL SERVICIO ---

  // - Metodo de Registro -
  public SubirFicheros(_ficheros): Observable<any>{
    return this._http.post('http://localhost:3000/api/Registro',_ficheros,{ reportProgress:true, observe: 'events' });
  }
}
