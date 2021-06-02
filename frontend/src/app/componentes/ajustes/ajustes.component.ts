import { Usuario } from './../../modelos/Usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../servicios/usuario.service';
import { Router } from '@angular/router';
import { Login_registroService } from "../../servicios/login_registro.service";
import {servidor} from '../../keys';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  localUsuario = JSON.parse(localStorage.getItem("usuario"));
  url:string=`${servidor.URI}/api/usuarios/`+this.localUsuario._id;
  repetido:boolean=false;
  repetido_ctr:boolean=false;
  ctr:string;
  ctr_rep:string;
  file: File;

  error:boolean=false;
  tError:string;

  usuario:Usuario;
  filesToUpload: File[];

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _loginRegistroServicio: Login_registroService
  ) { 
    this.usuario=new Usuario("","","","","","",false);
  }

  ngOnInit() {
  }

  onSubmit(form){
    this._usuarioService.editar(this.localUsuario).subscribe(
      response=>{
        localStorage.setItem("usuario", JSON.stringify(this.localUsuario));
        this._router.navigate(['/perfil']);
      },
      error=>{
        this.repetido=true;
      }
    )
  }

  onSubmitFoto(form){
    this._usuarioService.subirImagen(this.localUsuario,this.file).subscribe(
      response=>{
        this.localUsuario.foto_perfil=this.localUsuario._id+".jpg";
        localStorage.setItem("usuario", JSON.stringify(this.localUsuario));
        this._router.navigate(['/perfil']);
      },
      error=>{
        if(error.error.status=="EXT_FAILED"){
          this.tError="La imagen debe ser .jpg/.png";
          this.error=true;
        }
        console.log(error.error.status);
        console.log("mal");
      }
    )
  }

  onPhotoSelected(event): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      console.log(this.file);
    }
  }

  cerrarSesion(){
    this._loginRegistroServicio.logout();
  }

}
