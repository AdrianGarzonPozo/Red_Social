var express = require('express');
var PublicacionesControlador = require('../controladores/publicaciones');

var router = express.Router();

//Usamos como middleware connect-multiparty para poder tratar ficheros subidos
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads/foto_publicacion' });   //Defino que los archivos subidos se guarden en uploads


router.get('/publicaciones', PublicacionesControlador.recuperarTodas);
router.get('/publicaciones/:id', PublicacionesControlador.recuperarUna);
router.post('/publicaciones', PublicacionesControlador.añadirNueva);
router.put('/publicaciones/:id', PublicacionesControlador.modificar);
router.delete('/publicaciones/:id', PublicacionesControlador.eliminar);


router.post('/subirImagen/:id', multipartMiddleware, PublicacionesControlador.subirImagen);
router.get('/imagen/:imagen', PublicacionesControlador.recuperarImagen);


module.exports = router;