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

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      let _boolTest = await this._logSigServ.CheckLoged(this._tokenStore.getJwt()).toPromise();
      if(_boolTest.res){
        return true;
      } else {
        if(_boolTest.exp){
          this._tokenStore.setTokenFromREST(null);
        }
        this._router.navigate(['LoginRegistro']);
      }
      
  }
  
}
