import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// - Servicios -
import { FileUploadService } from 'src/app/services/http/file-upload.service';
import { SessionVarService } from 'src/app/services/session/session-var.service';


@Component({
  selector: 'app-subir-imagenes-component',
  templateUrl: './subir-imagenes-component.component.html'
})
export class SubirImagenesComponent implements OnInit {

  // - Propiedades Componente -
  public formImg: FormGroup;
  private _fileVar: File;
  public IconImg: string = "<i class='bi bi-cloud-arrow-up-fill'></i>";

  constructor(
    private _fileUpload: FileUploadService,
    private _tokenStore: SessionVarService,
    private _router: Router
  ) { 
    this.formImg = new FormGroup(
      {
        imgInput: new FormControl('', [
          Validators.required,
          Validators.pattern('^.*\.(jpe?g|png)$')

        ]),
        precioInput: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(9999),
          Validators.pattern('^[0-9]{1,}$')

        ])
      }
    );
  }

  ngOnInit(): void {
  }

  public cargaFichero(InputImgTag){
    this._fileVar = InputImgTag.files[0] as File;
  }

  public async suibirImagen(){
    // - Spinner informativo -
    this.IconImg = "<span class='spinner-grow spinner-grow-sm text-info'></span>";
    
    // - Creacion de paquete de datos -
    let formData = new FormData();
    formData.append('foto', this._fileVar,'MiFoto.jpg');
    formData.append('precio',this.formImg.value.precioInput as string);
    formData.append('jwt', this._tokenStore.getJwt());

    this._fileUpload.SubirFicheros(formData).subscribe(
      (success)=>{
      if (success.status === 200 && success.body.exp === false) {
        // - Si fue con exito se re-enruta -
        this._router.navigate(['Index']);
      } else {
        // - Nunca deberia entrar por aqui -
        this.IconImg = "<i class='bi bi-exclamation-triangle-fill text-warning'></i>";
        console.log(success);
      }
      
    },
    (err)=>{
      if (err.status === 400) {
        if(err.body.exp){
          // - Token expirado, retornar a Login/Registro -
          this._tokenStore.setTokenFromREST(null);
          this._router.navigate(['LoginRegistro']);
        }else{
          // - Error en el proceso -
          this.IconImg = "<i class='bi bi-x-square-fill text-danger'></i>";
        }
      }else{
        // - Otro error distinto en servidor -
        this.IconImg = "<i class='bi bi-exclamation-triangle-fill text-warning'></i>";
        
      }
      console.log(err);
      
    });
  }



}
