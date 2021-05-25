import { BuscadorComponent } from './componentes/buscador/buscador.component';
import { AjustesComponent } from './componentes/ajustes/ajustes.component';
import { TokenInterceptorService } from './servicios/token-interceptor.service';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { Login_registroService } from './servicios/login_registro.service';
import { Login_registroComponent } from './componentes/login_registro/login_registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { appRoutingProviders, routing } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule  } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Login_registroComponent,
    PerfilComponent,
    AjustesComponent,
    BuscadorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
    appRoutingProviders,
    Login_registroService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
