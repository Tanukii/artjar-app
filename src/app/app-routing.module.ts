import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// --- IMPORTACION DE COMPONENTES ---
import { LogSignComponent } from './components/Log-SignComponent/log-sign.component';


const routes: Routes = [
  // - Ruta a Login y Registro -
  { path:'LoginRegistro', component: LogSignComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
