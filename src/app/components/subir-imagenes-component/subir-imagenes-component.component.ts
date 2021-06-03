import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// - Servicios -
import { FileUploadService } from 'src/app/services/http/file-upload.service';


@Component({
  selector: 'app-subir-imagenes-component',
  templateUrl: './subir-imagenes-component.component.html'
})
export class SubirImagenesComponent implements OnInit {

  // - Propiedades Componente -
  public formImg: FormGroup;
  private _fileVar: File;

  constructor(
    private _fileUpload: FileUploadService,
    private _router: Router
  ) { 
    this.formImg = new FormGroup(
      {
        imgInput: new FormControl('', [
          Validators.required,
          Validators.pattern('.*\.(jpe?g|bmp|png)$')

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
    console.log('Subiendo Imagen');
    let formData = new FormData();
    formData.append('foto', this._fileVar,'MiFoto.jpg');
    formData.append('precio',this.formImg.value.precioInput as string);

    this._fileUpload.SubirFicheros(formData).subscribe(
      (success)=>{
      if (success.status === 200) {
        this._router.navigate(['Index']);
      } else {
        console.log(success);
      }
      
    },
    (err)=>{
      if (err.status === 400) {
        console.log(err);
      }
    });
  }



}
