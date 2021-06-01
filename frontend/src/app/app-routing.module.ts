import { BuscadorComponent } from './componentes/buscador/buscador.component';
import { Login_registroComponent } from './componentes/login_registro/login_registro.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';

import { ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { AjustesComponent } from './componentes/ajustes/ajustes.component';
import { SubirComponent } from './componentes/subir/subir.component';

const appRoutes: Routes = [
  { path: '', component: Login_registroComponent},
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'perfil/:id', component: PerfilComponent },
  { path: 'ajustes', component: AjustesComponent },
  { path: 'buscador', component: BuscadorComponent },
  { path: 'subir', component: SubirComponent },
  { path: '**', component: HomeComponent }    //Ruta 404
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
