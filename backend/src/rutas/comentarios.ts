import {Router} from 'express';
import {comentarioControlador} from '../controladores/comentarios';

var router = Router();


router.get('/comentarios/:idPublicacion', comentarioControlador.recuperarTodos);
router.post('/comentarios/:idPublicacion/:idUsuario', comentarioControlador.añadirNuevo);
//router.delete('/comentarios/:idPublicacion/:idComentario', comentarioControlador.eliminar);

module.exports = router;