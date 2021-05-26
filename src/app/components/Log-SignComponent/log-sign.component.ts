import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


// --- Inyeccion de Servicio ---
import { RegistrarService } from 'src/app/services/http/registrar.service';
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
    private _registrar:RegistrarService
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
    console.log('Ejecutamos funcion');
    this._registrar.Registrar().subscribe(
      (data)=>{
        console.log('Se ejecuta Subscribe')
        console.log(data);
      }
    );
  }
  

}
