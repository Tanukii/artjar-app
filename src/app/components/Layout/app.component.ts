// - Importacion de modulos -
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// - Importacion de servicios -
import { SessionVarService } from 'src/app/services/session/session-var.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  title = 'artjar-app';
  public _statusIs:boolean;

  constructor( private _tokenStore: SessionVarService, private _router: Router) {
    let _checkStatus$: Observable<boolean> = this._tokenStore.getStatus();
    _checkStatus$.subscribe(
      (_status:boolean)=> this._statusIs = _status as boolean
    );
  }

  public LogOut(){
    this._tokenStore.setTokenFromREST(null);
    this._router.navigate(['Index']);
  }
}
