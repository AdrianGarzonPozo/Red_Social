import { Router } from 'express';
import { usuarioControlador } from './../controladores/usuarios';
import { verifToken } from '../middlewares/autJwt';

const router: Router = Router();


//Rutas
router.get('/usuarios', verifToken, usuarioControlador.recuperarTodos); //Recuperar todos
router.get('/usuarios/:idUsuario', verifToken, usuarioControlador.recuperarUno); //Recuperar 1
router.post('/usuarios/buscar/:id', /* verifToken, */ usuarioControlador.buscarUsuarios); //Buscar Usuarios
router.put('/usuarios/:idUsuario', /* verifToken, */ usuarioControlador.modificar); //Editar
router.delete('/usuarios/:idUsuario', /* verifToken, */ usuarioControlador.eliminar); //Borrar 

//Guardar la foto del perfil del usuario con multer


router.post('/subirImagen/:idUsuario', /* verifToken, */ usuarioControlador.subirImagen);
router.get('/recuperarImagen/:idUsuario', /* verifToken, */ usuarioControlador.recuperarImagen);


router.put('/seguir/:idUsuario/:idSeguir', /* verifToken, */ usuarioControlador.seguir); //Seguir a otro usuario
router.put('/dejarSeguir/:idUsuario/:idNoSeguir', /* verifToken, */ usuarioControlador.dejarSeguir); //Seguir a otro usuario


module.exports = router;