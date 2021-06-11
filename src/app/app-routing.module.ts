import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// --- IMPORTACION DE COMPONENTES ---
import { IndexComponent } from 'src/app/components/IndexComponent/index-component.component';
import { LogSignComponent } from 'src/app/components/Log-SignComponent/log-sign.component';
import { Error404Component } from 'src/app/components/error404/error404.component';
import { SubirImagenesComponent } from 'src/app/components/subir-imagenes-component/subir-imagenes-component.component';

// --- Importacion Guard ---
import { GeneralGuard } from 'src/app/services/guard/general.guard';

const routes: Routes = [

  // - Ruta generica -
  { path: '', redirectTo: 'Index', pathMatch: 'full'},

  // - Ruta a Index -
  { path:'Index', component: IndexComponent },

  // - Ruta a Login y Registro -
  { path:'LoginRegistro', component: LogSignComponent },

  // - Ruta Subida de imagenes -
  { path:'subirImagenes',canActivate: [GeneralGuard], component: SubirImagenesComponent},

  // - Ruta de error -
  { path:'**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
