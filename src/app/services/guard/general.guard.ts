// --- IMPORT MODULOS ---
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// --- IMPORT SERVICES ---
import { LogSignService } from 'src/app/services/http/LogSign.service';
import { SessionVarService } from 'src/app/services/session/session-var.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralGuard implements CanActivate {
  constructor(
    private _logSigServ: LogSignService,
    private _tokenStore: SessionVarService,
    private _router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let _content = this._tokenStore.getJwt();
      if(_content){
        console.log(_content);
        return true;
      } else {
        this._router.navigate(['LoginRegistro']);
        return false;
      }
      
  }
  
}
