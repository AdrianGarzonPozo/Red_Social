import { Router } from 'express';
import { usuarioControlador } from './../controladores/usuarios';
const multer = require('multer');
const path = require('path');

const router: Router = Router();


//Rutas
router.get('/usuarios', usuarioControlador.recuperarTodos); //Recuperar todos
router.get('/usuarios/:idUsuario', usuarioControlador.recuperarUno); //Recuperar 1
router.post('/usuarios', usuarioControlador.añadirNuevo); //Añadir
router.put('/usuarios/:idUsuario', usuarioControlador.modificar); //Editar
//router.delete('/usuarios/:id', usuarioControlador.eliminar); //Borrar 

//Guardar la foto del perfil del usuario con multer


router.post('/subirImagen/:idUsuario', usuarioControlador.subirImagen);
router.get('/recuperarImagen/:idUsuario', usuarioControlador.recuperarImagen);


router.put('/seguir/:idUsuario/:idSeguir', usuarioControlador.seguir); //Seguir a otro usuario
router.put('/dejarSeguir/:idUsuario/:idNoSeguir', usuarioControlador.dejarSeguir); //Seguir a otro usuario


module.exports = router;