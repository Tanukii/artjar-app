// --- Importacion de Componentes ---
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


// --- Importacion de Servicios ---
import { LogSignService } from 'src/app/services/http/LogSign.service';

// --- Importacion de Modelos ---
import { IUsuario } from 'src/app/models/usuarioModel';

@Component({
  selector: 'app-log-sign',
  templateUrl: './log-sign.component.html',
  styleUrls: ['./log-sign.component.css']
})
export class LogSignComponent implements OnInit {

  // - Propiedades FormGroup -
  public formLogin: FormGroup;
  public formRegistro: FormGroup;

  constructor(
    private _registrar:LogSignService
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
          Validators.maxLength(12)
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

      }, this._testPassword()
    );
    // ^ --- FORM GROUP REGISTRO --- ^
  }

  // --- METODO ON INIT ---
  ngOnInit(): void {
  }

  // --- METODO TEST PASSWORD ---
  private _testPassword():ValidatorFn{

    return (fg: FormGroup): ValidationErrors => {

      var _vContra=fg.controls['contra'].value;
      var _vReContra=fg.controls['recontra'].value;
  
      if (_vContra != _vReContra) {
          fg.controls['recontra'].setErrors({ confirmIgualPassword: false });
      } else {
          fg.controls['recontra'].setErrors(null);
      }
      return null;
    }
  }

  // --- METODO TEST NICKNAME ---


  // --- Metodo LOGIN ---
  public nada(){
    null;
  }


  // --- METODO REGISTRO ---
  public Registrar(){
    // --- Parseo del Form a Objeto ---
    let _vForm = this.formRegistro.value;
    
    let _usuarioObject: IUsuario={
      nickname: _vForm.nickname,
      password: _vForm.contra
    };
    
    this._registrar.Registrar(_usuarioObject).subscribe(
      (data)=>{
        console.log('Se ejecuta Subscribe')
        console.log(data);
      }
    );
  }
  

}
