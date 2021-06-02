import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtResponseI } from './../interfaces/JwtResponse';
import { Injectable } from '@angular/core';
import {servidor} from '../keys';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  url: string;
  authSubject: BehaviorSubject<any>;

  constructor(
    public _http: HttpClient
  ) {
    this.url = `${servidor.URI}/api/`;
    this.authSubject = new BehaviorSubject(false);
  }

  recuperarPublicacion(idPublicacion: string): Observable<any> {
    return this._http.get<JwtResponseI>(`${this.url}publicaciones/${idPublicacion}`);
  }

  crearPublicacion(idUsuario: string, texto: string): Observable<any> {
    const params={texto_foto:texto};
    return this._http.post<JwtResponseI>(`${this.url}publicaciones/${idUsuario}`,  params);
  }

  subirImagen(idPublicacion,foto):Observable<any>{
    const fd = new FormData();
    fd.append('foto_publicacion', foto);
    return this._http.post<JwtResponseI>(`${this.url}subirImagenPublicacion/${idPublicacion}`, fd);
  }

  like(idUsuario, idPublicacion):Observable<any>{
    let headers=new HttpHeaders().set('Content-type','application/json');
    return this._http.put<JwtResponseI>(`${this.url}/like/${idUsuario}/${idPublicacion}`, {headers:headers});
  }

  disLike(idUsuario, idPublicacion):Observable<any>{
    let headers=new HttpHeaders().set('Content-type','application/json');
    return this._http.put<JwtResponseI>(`${this.url}/disLike/${idUsuario}/${idPublicacion}`, {headers:headers});
  }

  eliminarPublicacion(idUsuario: string, idPublicacion: string): Observable<any> {
    return this._http.delete<JwtResponseI>(`${this.url}publicaciones/${idUsuario}/${idPublicacion}`,  {});
  }

}
