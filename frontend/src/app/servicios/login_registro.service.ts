import { JwtResponseI } from './../interfaces/JwtResponse';
import { UsuarioI } from "../interfaces/Usuario";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, interval, merge, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Login_registroService {

  url: string;
  authSubject: BehaviorSubject<any>;
  private token: string;
  private usuario:Object;

  constructor(
    public _http: HttpClient
  ) {
    this.url = "http://localhost:3700/api/";
    this.authSubject = new BehaviorSubject(false);
  }

  register(usuario: UsuarioI): Observable<JwtResponseI> {
    return this._http.post<JwtResponseI>(`${this.url}registro`,
      usuario).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            this.saveTokenUsuario(res.token, res.usuario);
          }
        })
      );
  }

  login(usuario: UsuarioI): Observable<JwtResponseI> {
    return this._http.post<JwtResponseI>(`${this.url}login`,
      usuario).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            this.saveTokenUsuario(res.token, res.usuario);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("usuario");
  }

  private saveTokenUsuario(token: string, usuario:Object): void {
    localStorage.setItem("x-access-token", token);
    this.token = token;
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.usuario = usuario;
  }

  /* private getTokenUsuario(): Object {
    if (!this.token && !this.usuario) {
      this.token = localStorage.getItem("x-access-token");
      this.usuario = localStorage.getItem("usuario");
    }
    return {this.token, this.usuario};
  } */

}
