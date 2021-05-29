import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// --- IMPORTACION DE COMPONENTES ---
import { IndexComponentComponent } from './components/IndexComponent/index-component.component';
import { LogSignComponent } from './components/Log-SignComponent/log-sign.component';

import { Error404Component } from './components/error404/error404.component';


const routes: Routes = [

  // - Ruta generica -
  { path: '', redirectTo: 'Index', pathMatch: 'full'},

  // - Ruta a Index -
  { path:'Index', component: IndexComponentComponent },

  // - Ruta a Login y Registro -
  { path:'LoginRegistro', component: LogSignComponent },

  // - Ruta de error -
  { path:'**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
