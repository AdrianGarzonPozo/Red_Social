import { Router } from 'express';
import { publicacionControlador } from './../controladores/publicaciones';

const router: Router = Router();

router.get('/publicaciones', publicacionControlador.recuperarTodas);
router.get('/publicaciones/:id', publicacionControlador.recuperarUna);
router.post('/publicaciones/:idUsuario', publicacionControlador.añadirNueva);
router.put('/publicaciones/:id', publicacionControlador.modificar);
/* router.delete('/publicaciones/:idUsuario/:id', publicacionControlador.eliminar); */


router.post('/subirImagen/:id', publicacionControlador.subirImagen);
router.get('/recuperarImagen/:id', publicacionControlador.recuperarImagen);

router.put('/like/:idUsuario/:id', publicacionControlador.like);
router.put('/disLike/:idUsuario/:id', publicacionControlador.disLike);


module.exports = router;