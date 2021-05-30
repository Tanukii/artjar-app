// --- Importacion de Componentes ---
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';


// --- Importacion de Servicios ---
import { LogSignService } from 'src/app/services/http/LogSign.service';
import { SessionVarService } from 'src/app/services/session/session-var.service';

// --- Importacion de Modelos ---
import { IUsuario } from 'src/app/models/usuarioModel';

@Component({
  selector: 'app-log-sign',
  templateUrl: './log-sign.component.html'
})
export class LogSignComponent implements OnInit {

  // - Propiedades FormGroup -
  public formLogin: FormGroup;
  public formRegistro: FormGroup;

  // - Strings de HTML -
  public iconHTML: string;
  public nombreCogido: string = "";


  constructor(
    private _logSigServ: LogSignService,
    private _tokenStore: SessionVarService,
    private _router: Router
  ) {
    // v --- FORM GROUP LOGIN --- v
    this.formLogin = new FormGroup(
      {
        nickname: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12)
        ]),
        contra: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12)
        ])
      }
    );
    // ^ --- FORM GROUP LOGIN --- ^

    // v --- FORM GROUP REGISTRO --- v
    this.formRegistro = new FormGroup(
      {
        nickname: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          this.CheckNickname()
        ]),
        contra: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12)
        ]),
        recontra: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12)
        ])

      }, { validators: [this._testPassword()] }
    );
    // ^ --- FORM GROUP REGISTRO --- ^
    this.iconHTML = "<i class='bi bi-input-cursor-text'></i>";
  }

  // --- METODO ON INIT ---
  ngOnInit(): void {
  }

  // --- METODO TEST PASSWORD ---
  private _testPassword(): ValidatorFn {

    return (fg: FormGroup): ValidationErrors => {

      var _vContra = fg.controls['contra'].value;
      var _vReContra = fg.controls['recontra'].value;

      if (_vContra != _vReContra) {
        fg.controls['recontra'].setErrors({ confirmIgualPassword: false });
      } else {
        fg.controls['recontra'].setErrors(null);
      }
      return null;
    }
  }


  // --- METODO TEST NICKNAME ---
  // - Solo llama al servidor cuando se cumple los caracteres necesarios, para no sobrecargar -
  // - Uso de variables para iconos y mensajes de validacion, ngIf no parece funcionar con esto -
  public CheckNickname(): ValidatorFn {
    return (abstractControl:AbstractControl): ValidationErrors => {
      if(abstractControl.value.length > 7 && abstractControl.value.length < 13){
      // - Cambiamos icono a spinner, aunque no se vera -
      this.iconHTML = "<span class='spinner-grow spinner-grow-sm text-info'></span>";

      this._logSigServ.CheckNickname(abstractControl.value).subscribe(
        (success) => {
          if (success.status === 200) {
            this.nombreCogido = "<p class='text-success fw-bold'>Este nombre esta disponible</p>";
            this.iconHTML = "<i class='bi bi-check-square-fill text-success'></i>";
            abstractControl.setErrors(null);
          } else {
            this.iconHTML = "<i class='bi bi-exclamation-triangle-fill text-warning'></i>";
            this.nombreCogido = "<p class='text-warning fw-bold'>Sucedio un error</p>";
            console.log(success);
            abstractControl.setErrors({warning: true});
          }
        },
        (err) => {
          if (err.status === 400) {
            this.nombreCogido = "<p class='text-danger fw-bold'>Este nombre ya esta cogido</p>";
            this.iconHTML = "<i class='bi bi-x-square-fill text-danger'></i>";
            abstractControl.setErrors({isUnique: false});
          } else {
            this.iconHTML = "<i class='bi bi-exclamation-triangle-fill text-warning'></i>";
            this.nombreCogido = "<p class='text-warning fw-bold'>Sucedio un error, version 2</p>";
            console.log(err);
            abstractControl.setErrors({warning: true});
          }

        }
      );
    }else {
      this.nombreCogido = "";
      this.iconHTML = "<i class='bi bi-input-cursor-text'></i>";
      abstractControl.setErrors(null);
      return null;
    }
  }

}


  // --- Metodo LOGIN ---
  public nada(){
  null;
}


  // --- METODO REGISTRO ---
  public Registrar(){
  // --- Parseo del Form a Objeto ---
  let _vForm = this.formRegistro.value;

  let _usuarioObject: IUsuario = {
    nickname: _vForm.nickname,
    password: _vForm.contra
  };

  this._logSigServ.Registrar(_usuarioObject).subscribe(
    (success)=>{
      this._tokenStore.setTokenFromREST(success);
      this._router.navigate(['Index']);
    },
    (err)=>{
      console.log(err)
    }
  );
}
  

}
