import {Router} from 'express';
import {autentificacionControlador} from '../controladores/autentificacion';

var router = Router();

router.post('/registro', autentificacionControlador.registro);
router.post('/login', autentificacionControlador.login);

module.exports = router;