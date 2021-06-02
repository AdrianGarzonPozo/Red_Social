import { PublicacionService } from './../../servicios/publicacion.service';
import { UsuarioService } from './../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery';
import {servidor} from '../../keys';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  IdusuarioSeguir: string = '';
  id: string = "";
  usuario: Object = '';
  nombre: string = '';
  biografia: string = '';
  seguidoresArr: [string] = [""];
  seguidores: number = 0;
  siguiendo: number = 0;
  perfil: boolean;
  publicaciones: any;
  localUsuario = JSON.parse(localStorage.getItem("usuario"));
  publicacionesMostrar: any = [];
  imagenesMostrar: any = [];

  seguirOno: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private _publicacionService: PublicacionService,
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
        const arrSeguidores = new Set(this.localUsuario.seguidores);
        this.seguidores = [...arrSeguidores].length;
        const arrSiguiendo = new Set(this.localUsuario.siguiendo);
        this.siguiendo = [...arrSiguiendo].length;
        const arrPubli = new Set(this.localUsuario.publicaciones);
        this.publicaciones = [...arrPubli];
        this.id = this.localUsuario._id;

        if (this.localUsuario.foto_perfil && this.localUsuario.foto_perfil != '') {
          $(".foto").css("background-image", "url("+servidor.URI+"/public/uploads/foto_perfil/" + this.localUsuario.foto_perfil + ")");
        }

        this.perfil = true;

        if (this.publicaciones.length > 0) {
          this.mostrarPublicaciones(this.publicaciones);
        }
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
        this.id = data._id;
        this.seguidoresArr = data.seguidores;
        this.seguidores = data.seguidores.length;
        this.siguiendo = data.siguiendo.length;
        this.publicaciones = data.publicaciones;

        if (data.foto_perfil && data.foto_perfil != '') {
          $(".foto").css("background-image", "url("+servidor.URI+"/public/uploads/foto_perfil/" + data.foto_perfil + ")");
        }

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
      }
    );
  }

  mostrarPublicaciones(publicaciones) {
    publicaciones.forEach(element => {
      this._publicacionService.recuperarPublicacion(element).subscribe(
        data => {
          this.publicacionesMostrar.push(data.publicacion);
          this.imagenesMostrar.push(`${servidor.URI}/public/uploads/foto_publicacion/` + data.publicacion.foto);
        },
        error => {
        }
      );
    });
  }

  like(idPublicacion: string) {
    this._publicacionService.like(this.localUsuario._id, idPublicacion).subscribe(
      data => {
      },
      error => {
        console.log(error);
      }
    );
  }

  disLike(idPublicacion: string) {
    this._publicacionService.disLike(this.localUsuario._id, idPublicacion).subscribe(
      data => {
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminar(idPublicacion: string) {
    const idUsuario=$(".nombre-ajustes").attr("id");

    this._publicacionService.eliminarPublicacion(idUsuario, idPublicacion).subscribe(
      data => {
        location.reload();
      },
      error => {
        console.log(error);
      }
    );

  }

}
