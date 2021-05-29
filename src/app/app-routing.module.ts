import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// --- IMPORTACION DE COMPONENTES ---
import { IndexComponentComponent } from 'src/app/components/IndexComponent/index-component.component';
import { LogSignComponent } from 'src/app/components/Log-SignComponent/log-sign.component';
import { GuardTestComponent } from 'src/app/components/guard-test/guard-test.component';
import { Error404Component } from 'src/app/components/error404/error404.component';

// --- Importacion Guard ---
import { GeneralGuard } from 'src/app/services/guard/general.guard';

const routes: Routes = [

  // - Ruta generica -
  { path: '', redirectTo: 'Index', pathMatch: 'full'},

  // - Ruta a Index -
  { path:'Index', component: IndexComponentComponent },

  // - Ruta a Login y Registro -
  { path:'LoginRegistro', component: LogSignComponent },

  // - Ruta GuardTest -
  { path:'GuardTest',canActivate: [GeneralGuard], component: GuardTestComponent},

  // - Ruta de error -
  { path:'**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
