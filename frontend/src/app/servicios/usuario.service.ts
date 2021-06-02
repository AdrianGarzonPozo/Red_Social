import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtResponseI } from './../interfaces/JwtResponse';
import { Injectable } from '@angular/core';
import {servidor} from '../keys';

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
    this.url = `${servidor.URI}/api/`;
    this.authSubject = new BehaviorSubject(false);
  }
  
  recuperarUsuario(idUsuario: string): Observable<any> {
    return this._http.get<JwtResponseI>(`${this.url}usuarios/${idUsuario}`);
  }

  buscarUsuarios(idUsuario: string, buscar: string): Observable<any> {
    const params={nombre:buscar};
    return this._http.post<JwtResponseI>(`${this.url}usuarios/buscar/${idUsuario}`,  params);
  }

  editar(usuario):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set('Content-type','application/json');
    return this._http.put<JwtResponseI>(`${this.url}usuarios/${usuario._id}`, params, {headers:headers});
  }

  editarContrasena(usuario, ctr):Observable<any>{
    let params=JSON.stringify(ctr);
    let headers=new HttpHeaders().set('Content-type','application/json');
    return this._http.put<JwtResponseI>(`${this.url}usuarios/${usuario._id}`, params, {headers:headers});
  }

  seguir(idUsuario: string, idUsuarioAseguir: string): Observable<any> {
    return this._http.put<JwtResponseI>(`${this.url}seguir/${idUsuario}/${idUsuarioAseguir}`, "", );
  }

  dejarSeguir(idUsuario: string, idUsuarioAseguir: string): Observable<any> {
    return this._http.put<JwtResponseI>(`${this.url}dejarSeguir/${idUsuario}/${idUsuarioAseguir}`, "", );
  }

  recuperarImagenPerfil(idUsuario: string): Observable<any> {
    return this._http.get<JwtResponseI>(`${this.url}recuperarImagen/${idUsuario}`);
  }

  subirImagen(usuario,foto):Observable<any>{
    const fd = new FormData();
    fd.append('foto_perfil', foto);
    return this._http.post<JwtResponseI>(`${this.url}subirImagen/${usuario._id}`, fd);
  }

}

