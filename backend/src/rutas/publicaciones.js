var express = require('express');
var PublicacionesControlador = require('../controladores/publicaciones');

var router = express.Router();


router.get('/publicaciones', PublicacionesControlador.recuperarTodas);
router.get('/publicaciones/:id', PublicacionesControlador.recuperarUna);
router.post('/publicaciones/:idUsuario', PublicacionesControlador.añadirNueva);
router.put('/publicaciones/:id', PublicacionesControlador.modificar);
router.delete('/publicaciones/:id', PublicacionesControlador.eliminar);


router.post('/subirImagen/:id', PublicacionesControlador.subirImagen);
router.get('/recuperarImagen/:id', PublicacionesControlador.recuperarImagen);


module.exports = router;