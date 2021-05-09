import { Login_registroComponent } from './componentes/login_registro/login_registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { appRoutingProviders, routing } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule  } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Login_registroComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
