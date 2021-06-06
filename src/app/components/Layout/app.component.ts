// - Importacion de modulos -
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// - Importacion de servicios -
import { SessionVarService } from 'src/app/services/session/session-var.service';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  title = 'artjar-app';

  // - Parametros del usuario -
  public _statusIs:boolean;
  public _usrIs: Object;
  public _saldoIs: Object;

  constructor( private _tokenStore: SessionVarService, private _router: Router) {
    // - Carga de datos -
    let _checkStatus$: Observable<boolean> = this._tokenStore.getStatus();
    _checkStatus$.subscribe(
      (_status:boolean)=> this._statusIs = _status as boolean
    );

    let _checkUser$: Observable<Object> = this._tokenStore.getUser();
    _checkUser$.subscribe(
      (_usr:Object)=> this._usrIs = _usr as Object
    );

    let _checkSaldo$: Observable<Object> = this._tokenStore.getExBucks();
    _checkSaldo$.subscribe(
      (_munny:Object)=> this._saldoIs = _munny as Object
    );
  }

  public LogOut(){
    this._tokenStore.setTokenFromREST(null);
    this._router.navigate(['Index']);
  }
}
