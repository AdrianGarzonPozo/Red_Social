import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  IdusuarioSeguir: string = '';
  usuario: Object = '';
  nombre: string = '';
  biografia: string = '';
  seguidoresArr: [string] = [""];
  seguidores: number = 0;
  siguiendo: number = 0;
  perfil: boolean;
  localUsuario = JSON.parse(localStorage.getItem("usuario"));

  seguirOno: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.perfil = false;
    this.seguirOno = false;
  }

  ngOnInit() {

    this.usuarioPerfil();

  }

  usuarioPerfil() {
    this._route.params.subscribe((params: Params) => {
      if (params.id) {
        this.perfil = false;
        this.IdusuarioSeguir = params.id;

        this.perfilUsuario(this.IdusuarioSeguir);

      } else {
        this.nombre = this.localUsuario.nombre;
        this.biografia = this.localUsuario.biografia;
        this.seguidores = this.localUsuario.seguidores.length;
        this.siguiendo = this.localUsuario.siguiendo.length;

        this.perfil = true;
      }
    });
  }

  perfilUsuario(idUsuarioBuscar: string) {
    this._usuarioService.recuperarUsuario(idUsuarioBuscar).subscribe(data => {
      if (data.nombre == this.localUsuario.nombre) {
        localStorage.setItem("usuario", JSON.stringify(data));
      } else {
        this.nombre = data.nombre;
        this.biografia = data.biografia;
        this.seguidoresArr = data.seguidores;
        this.seguidores = data.seguidores.length;
        this.siguiendo = data.siguiendo.length;

        if (this.seguidoresArr.indexOf(this.localUsuario._id) == -1) {
          this.seguirOno = true;
        } else {
          this.seguirOno = false;
        }
      }

    }, ((error: HttpErrorResponse) => {
      this._router.navigate(['/home']);
    }));
  }


  onSeguir() {
    this._usuarioService.seguir(this.localUsuario._id, this.IdusuarioSeguir).subscribe(
      data => {

        this.perfilUsuario(this.IdusuarioSeguir);

        this.perfilUsuario(this.localUsuario._id);

      },
      error => {
        console.log("Error al seguir a este usuario");
      }
    );
  }

  dejarSeguir() {
    this._usuarioService.dejarSeguir(this.localUsuario._id, this.IdusuarioSeguir).subscribe(
      data => {

        this.perfilUsuario(this.IdusuarioSeguir);

        this.perfilUsuario(this.localUsuario._id);

      },
      error => {
        console.log("Error al dejar de seguir a este usuario");
      }
    );
  }

}
