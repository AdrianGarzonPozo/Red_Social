import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {servidor} from '../../keys';
import * as $ from 'jquery';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  usuarios = [];

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,) { }

  ngOnInit() {
  }

  onEnter(value: string) {
    this._usuarioService.buscarUsuarios("1", value).subscribe(
      response => {
        this.usuarios = response;
        console.log(this.usuarios[0]);
        if(this.usuarios[0].foto_perfil && this.usuarios[0].foto_perfil!=''){
          console.log(this.usuarios[0].foto_perfil);
          console.log($(".foto"));
          $(".foto").css("background-image","url("+servidor.URI+"/public/uploads/foto_perfil/"+this.usuarios[0].foto_perfil+")");
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  onClick(evento, idUsuario) {
    if (idUsuario != JSON.parse(localStorage.getItem("usuario"))._id)
      this._router.navigate(['/perfil/' + idUsuario]);
    else
      this._router.navigate(['/perfil/']);
  }

}
