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

@NgModule({
  declarations: [
    AppComponent,
    IndexComponentComponent,
    LogSignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ LogSignService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
