const express=require('express');
const logControladores=require('../controladores/login_logout');

var router=express.Router();

router.get('/login', logControladores.login);
router.get('/logout', logControladores.logout);

module.exports=router;