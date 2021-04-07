var express = require('express');
var UsuariosControlador = require('../controladores/usuarios');

var router = express.Router();

//Configurar midlleware para poder manipular ficheros subidos
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads/foto_perfil' }); //Los ficheros que se suban se guardaran aqui


//Rutas
router.get('/usuarios', UsuariosControlador.recuperarTodos); //Recuperar todos
router.get('/usuarios/:id', UsuariosControlador.recuperarUno); //Recuperar 1
router.post('/usuarios', UsuariosControlador.añadirNuevo); //Añadir
router.put('/usuarios/:id', UsuariosControlador.modificar); //Editar
router.delete('/usuarios/:id', UsuariosControlador.eliminar); //Borrar

//Guardar la foto del perfil del usuario
router.post('/subirImagen/:id', multipartMiddleware, UsuariosControlador.subirImagen);
router.get('/imagen/:imagen', UsuariosControlador.recuperarImagen);

router.post('/seguir/:id/:seguir', UsuariosControlador.seguir); //Seguir a otro usuario


module.exports=router;