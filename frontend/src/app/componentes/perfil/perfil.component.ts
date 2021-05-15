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

  usuario: Object = '';
  nombre: string = '';
  biografia: string = '';
  seguidoresArr: [string] = [""];
  seguidores: number = 0;
  siguiendo: number = 0;
  perfil: boolean;

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

    this._route.params.subscribe((params: Params) => {
      if (params.id) {
        this.perfil = false;
        this._usuarioService.recuperarUsuario(params.id).subscribe(data => {
          this.nombre = data.nombre;
          this.biografia = data.biografia;
          this.seguidoresArr = data.seguidores;
          this.seguidores = data.seguidores.length;
          this.seguidores = data.siguiendo.length;
        }, ((error:HttpErrorResponse) => {
          /* this._router.navigate(['/home']); */
        }));

        if (this.seguidoresArr.indexOf(JSON.parse(localStorage.getItem("usuario"))._id) == -1) {
          this.seguirOno = true;
        }


      } else {
        const localUsuario = JSON.parse(localStorage.getItem("usuario"));
        this.nombre = localUsuario.nombre;
        this.biografia = localUsuario.biografia;
        this.seguidores = localUsuario.seguidores.length;
        this.seguidores = localUsuario.siguiendo.length;

        this.perfil = true;
      }
    });

  }

}
