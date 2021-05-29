import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/Layout/app.component';
import { IndexComponentComponent } from './components/IndexComponent/index-component.component';
import { LogSignComponent } from './components/Log-SignComponent/log-sign.component';

// --- Servicios a Inyectar ---
import { LogSignService } from './services/http/LogSign.service';
import { SessionVarService } from './services/session/session-var.service';
import { Error404Component } from './components/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponentComponent,
    LogSignComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ LogSignService, SessionVarService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
