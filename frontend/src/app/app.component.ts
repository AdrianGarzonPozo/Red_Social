import { UsuarioService } from './servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Login_registroService } from "./servicios/login_registro.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'frontend';
  nombre: string = '';
  id: string = '';
  foto_perfil='';

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

    const localUsuario=JSON.parse(localStorage.getItem("usuario"));
    this.nombre=localUsuario.nombre;
    this.id=localUsuario._id;

    if(localUsuario.foto_perfil!=''){
      this.foto_perfil=`http://localhost:3700/public/uploads/foto_perfil/${this.id}.jpg`;
      $(".foto_perfil").css("background-image",'url('+this.foto_perfil+')');
    }else{
      this.foto_perfil=`http://localhost:3700/public/uploads/foto_perfil/none.jpg`;
    }

  }

  logOut(){
    this._loginRegistroServicio.logout();
  }

}