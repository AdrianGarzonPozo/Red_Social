var express = require('express');
var ComentariosControlador = require('../controladores/comentarios');

var router = express.Router();


router.get('/comentarios', ComentariosControlador.recuperarTodos);
router.post('/comentarios', ComentariosControlador.añadirNuevo);
router.delete('/comentarios', ComentariosControlador.eliminar);

module.exports = router;