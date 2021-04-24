import { Router } from 'express';
import { publicacionControlador } from './../controladores/publicaciones';

const router: Router = Router();

router.get('/publicaciones', publicacionControlador.recuperarTodas);
router.get('/publicaciones/:idPublicacion', publicacionControlador.recuperarUna);
router.post('/publicaciones/:idUsuario', publicacionControlador.añadirNueva);
router.put('/publicaciones/:idPublicacion', publicacionControlador.modificar);
/* router.delete('/publicaciones/:idUsuario/:id', publicacionControlador.eliminar); */


router.post('/subirImagen/:idPublicacion', publicacionControlador.subirImagen);
router.get('/recuperarImagen/:idPublicacion', publicacionControlador.recuperarImagen);

router.put('/like/:idUsuario/:idPublicacion', publicacionControlador.like);
router.put('/disLike/:idUsuario/:idPublicacion', publicacionControlador.disLike);


module.exports = router;