import { UsuarioService } from './servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Login_registroService } from "./servicios/login_registro.service";
import {servidor} from './keys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'frontend';
  localUsuario=JSON.parse(localStorage.getItem("usuario"));

  constructor(
    private _usuarioServicio: UsuarioService,
    private _loginRegistroServicio: Login_registroService
  ) { }

  ngOnInit() {
    if (!localStorage.getItem("x-access-token") && !localStorage.getItem("usuario")) {
      $(".breadcrumbs").hide();
      $(".tl-menu").hide();
      $(".tl-menu-pc").hide();
    } else {
      $(".breadcrumbs").show();
      const ventana = $(window).width();
      if (ventana <= 415) {
        $(".tl-menu").show();
      } else {
        $(".tl-menu-pc").show();
      }
    }

    if(this.localUsuario && this.localUsuario.foto_perfil!=''){
      this.localUsuario.foto_perfil=`${servidor.URI}/public/uploads/foto_perfil/${this.localUsuario._id}.jpg`;
      $(".foto_perfil").css("background-image",'url('+this.localUsuario.foto_perfil+')');
    }else if(this.localUsuario){
      this.localUsuario.foto_perfil=`${servidor.URI}/public/uploads/foto_perfil/none.jpg`;
    }

  }

  logOut(){
    this._loginRegistroServicio.logout();
  }

}