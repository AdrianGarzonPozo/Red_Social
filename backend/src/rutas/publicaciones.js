var express = require('express');
var PublicacionesControlador = require('../controladores/publicaciones');

var router = express.Router();


router.get('/publicaciones', PublicacionesControlador.recuperarTodas);
router.get('/publicaciones/:id', PublicacionesControlador.recuperarUna);
router.post('/publicaciones/:idUsuario', PublicacionesControlador.añadirNueva);
router.put('/publicaciones/:id', PublicacionesControlador.modificar);
router.delete('/publicaciones/:idUsuario/:id', PublicacionesControlador.eliminar);


router.post('/subirImagen/:id', PublicacionesControlador.subirImagen);
router.get('/recuperarImagen/:id', PublicacionesControlador.recuperarImagen);

router.put('/like/:idUsuario/:id', PublicacionesControlador.like);
router.put('/disLike/:idUsuario/:id', PublicacionesControlador.disLike);


module.exports = router;