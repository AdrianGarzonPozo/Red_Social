import { PublicacionService } from './../../servicios/publicacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuario';
import { Login_registroService } from 'src/app/servicios/login_registro.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-subir',
  templateUrl: './subir.component.html',
  styleUrls: ['./subir.component.css']
})
export class SubirComponent implements OnInit {

  localUsuario = JSON.parse(localStorage.getItem("usuario"));
  url: string = "http://localhost:3700/api/usuarios/" + this.localUsuario._id;
  file: File;
  texto: string;
  idPublicacion: string;

  error:boolean=false;
  tError:string;

  usuario: Usuario;
  filesToUpload: File[];

  constructor(
    private _publicacionService: PublicacionService,
    private _router: Router,
    private _loginRegistroServicio: Login_registroService
  ) {
    this.usuario = new Usuario("", "", "", "", "", "", false);
  }

  ngOnInit() {
  }

  onSubmit(form) {
    if (this.file) {
      this._publicacionService.crearPublicacion(this.localUsuario._id, this.texto).subscribe(
        response => {
          this.idPublicacion = response.status;

          this.onSubmitFoto();
        },
        error => {
          alert("Error");
        }
      )
    } else {
      alert("Selecione una foto");
    }
  }

  onSubmitFoto() {
    this._publicacionService.subirImagen(this.idPublicacion,this.file).subscribe(
      response=>{
        this._router.navigate(['/perfil']);
      },
      error=>{
        if(error.error.status=="EXT_FAILED"){
          this.tError="La imagen debe ser .jpg/.png";
          this.error=true;
        }
      }
    )
  }

  onPhotoSelected(event): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      console.log(this.file);
    }
  }

}
