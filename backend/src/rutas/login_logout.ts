import {Router} from 'express';
import {logControlador} from '../controladores/login_logout';

var router=Router();

router.get('/login', logControlador.login);
router.get('/logout', logControlador.logout);

module.exports=router;