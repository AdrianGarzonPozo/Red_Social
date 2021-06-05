import { Router } from 'express';
import { publicacionControlador } from './../controladores/publicaciones';
import { verifToken } from '../middlewares/autJwt';

const router: Router = Router();

router.get('/publicacionesHome/:page', verifToken, publicacionControlador.recuperarTodas);
router.get('/publicaciones/:idPublicacion', verifToken, publicacionControlador.recuperarUna);
router.post('/publicaciones/:idUsuario', verifToken, publicacionControlador.añadirNueva);
router.put('/publicaciones/:idPublicacion', verifToken, publicacionControlador.modificar);
router.delete('/publicaciones/:idUsuario/:idPublicacion', verifToken, publicacionControlador.eliminar);


router.post('/subirImagenPublicacion/:idPublicacion', verifToken, publicacionControlador.subirImagen);
router.get('/recuperarImagenPublicacion/:idPublicacion', verifToken, publicacionControlador.recuperarImagen);

router.put('/like/:idUsuario/:idPublicacion', verifToken, publicacionControlador.like);
router.put('/disLike/:idUsuario/:idPublicacion', verifToken, publicacionControlador.disLike);


module.exports = router;