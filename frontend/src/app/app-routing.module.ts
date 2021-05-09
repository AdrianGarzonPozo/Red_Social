import { Login_registroComponent } from './componentes/login_registro/login_registro.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';

import { ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

const appRoutes: Routes = [
  { path: '', component: Login_registroComponent},
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent }    //Ruta 404
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
