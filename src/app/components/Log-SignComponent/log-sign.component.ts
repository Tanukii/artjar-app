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

  // - Strings de HTML -
  public iconHTML: string;
  public nombreCogido: string ="";

  // - Control Username -
  public isNicknameUnique: boolean = false;


  constructor(
    private _logSigServ:LogSignService
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

      }, {validators:[this._testPassword()]}
    );
    // ^ --- FORM GROUP REGISTRO --- ^
    this.iconHTML = "<i class='bi bi-input-cursor-text'></i>";
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
  public CheckNickname(){
    if(this.formRegistro.value.nickname.length > 7 && this.formRegistro.value.nickname.length < 13){
      // - Cambiamos icono a spinner, aunque no se vera -
      this.iconHTML ="<span class='spinner-grow spinner-grow-sm text-info'></span>";

      this._logSigServ.CheckNickname(this.formRegistro.value.nickname).subscribe(
            (success)=>{
              if(success.status === 200){
                this.isNicknameUnique= true;
                this.nombreCogido ="";
                this.iconHTML="<i class='bi bi-check-square-fill text-success'></i>";
              }else{
                this.isNicknameUnique= false;
                this.iconHTML="<i class='bi bi-exclamation-triangle-fill text-warning'></i>";
                this.nombreCogido ="<p class='text-warning fw-bold'>Sucedio un error</p>";
                console.log(success);
              }
            },
            (err)=>{
              if(err.status === 400){
                this.isNicknameUnique= false;
                this.nombreCogido ="<p class='text-danger fw-bold'>Este nombre ya esta cogido</p>";
                this.iconHTML="<i class='bi bi-x-square-fill text-danger'></i>";
              }else{
                this.isNicknameUnique= false;
                this.iconHTML="<i class='bi bi-exclamation-triangle-fill text-warning'></i>";
                this.nombreCogido ="<p class='text-warning fw-bold'>Sucedio un error</p>";
                console.log(err);
              }
              
            }
          );
    }else{
      this.nombreCogido ="";
      this.iconHTML="<i class='bi bi-input-cursor-text'></i>";
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
    
    let _usuarioObject: IUsuario={
      nickname: _vForm.nickname,
      password: _vForm.contra
    };
    
    this._logSigServ.Registrar(_usuarioObject).subscribe(
      (data)=>{
        console.log(data);
      }
    );
  }
  

}
