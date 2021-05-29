import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/Layout/app.component';
import { IndexComponentComponent } from './components/IndexComponent/index-component.component';
import { LogSignComponent } from './components/Log-SignComponent/log-sign.component';
import { Error404Component } from './components/error404/error404.component';
import { GuardTestComponent } from './components/guard-test/guard-test.component';

// --- Servicios a Inyectar ---
import { LogSignService } from './services/http/LogSign.service';
import { SessionVarService } from './services/session/session-var.service';
import { GeneralGuard } from 'src/app/services/guard/general.guard';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponentComponent,
    LogSignComponent,
    Error404Component,
    GuardTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ 
    LogSignService, 
    SessionVarService,
    GeneralGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
