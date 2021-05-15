import { UsuarioI } from './../../interfaces/Usuario';
import { Router } from '@angular/router';
import { loginUsuario } from './../../modelos/loginUsuario';
import { Component, OnInit } from '@angular/core';
import { Login_registroService } from "./../../servicios/login_registro.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-login_registro',
  templateUrl: './login_registro.component.html',
  styleUrls: ['./login_registro.component.css'],
  providers: [Login_registroService]
})
export class Login_registroComponent implements OnInit {

  public usuario: loginUsuario;

  constructor(
    private _loginRegistroServicio: Login_registroService,
    private router: Router
  ) {
    this.usuario = new loginUsuario("", "");
  }

  ngOnInit() {
    $(".incorrecto").hide();
    $(".inc-usu").hide();
    $(".inc-correo").hide();
    $(".inc-ctr").hide();

    const regisButton = document.getElementById('regis');
    const loginButton = document.getElementById('login');
    const contenedor = document.getElementById('contenedor');

    regisButton.addEventListener('click', () => {
      contenedor.classList.add("der-panel-active");
    });

    loginButton.addEventListener('click', () => {
      contenedor.classList.remove("der-panel-active");
    });
  }

  onLogin(form): void {
    this._loginRegistroServicio.login(form.value).subscribe(
      res => {
        location.href = "/navegacion";
      },
      error => {
        form.reset();
        $(".incorrecto").show();
      }
    )
  }

  onRegistro(form): void {
    const ctr = $("#ctr").val();
    const rep_ctr = $("#rep_ctr").val();

    if (ctr == rep_ctr) {
      $(".inc-ctr").hide();
      delete form.value.rep_contrasena;
      this._loginRegistroServicio.register(form.value).subscribe(
        res => {
          location.href = "/navegacion";
        },
        error => {
          if (error.error.status == "Error usuario") {
            $(".inc-usu").show();
          } else {
            $(".inc-usu").hide();
          }

          if (error.error.status == "Error correo") {
            $(".inc-correo").show();
          } else {
            $(".inc-correo").hide();
          }
          console.log("mal", error);
        }
      );
    }else{
      $(".inc-ctr").show();
    }
  }

}
