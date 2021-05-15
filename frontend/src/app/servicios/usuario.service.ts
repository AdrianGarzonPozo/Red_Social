import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtResponseI } from './../interfaces/JwtResponse';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("x-access-token")+''
    })
  };
  url: string;
  authSubject: BehaviorSubject<any>;
  token: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = "http://localhost:3700/api/";
    this.authSubject = new BehaviorSubject(false);
  }

  recuperarUsuario(idUsuario: string): Observable<any> {
    return this._http.get<JwtResponseI>(`${this.url}usuarios/${idUsuario}`);
  }

  seguir(idUsuario: string, idUsuarioAseguir: string): Observable<any> {
    return;
  }

  recuperarImagenPerfil(idUsuario: string): Observable<any> {
    return this._http.get<JwtResponseI>(`${this.url}recuperarImagen/${idUsuario}`);
  }

}

