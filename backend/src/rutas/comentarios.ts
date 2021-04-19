import {Router} from 'express';
import {comentarioControlador} from '../controladores/comentarios';

var router = Router();


router.get('/comentarios/:id', comentarioControlador.recuperarTodos);
router.post('/comentarios/:id', comentarioControlador.añadirNuevo);
router.delete('/comentarios/:id/:idComentario', comentarioControlador.eliminar);

module.exports = router;