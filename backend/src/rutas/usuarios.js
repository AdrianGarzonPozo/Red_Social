const express = require('express');
const UsuariosControlador = require('../controladores/usuarios');
const path = require('path');

var router = express.Router();


//Rutas
router.get('/usuarios', UsuariosControlador.recuperarTodos); //Recuperar todos
router.get('/usuarios/:id', UsuariosControlador.recuperarUno); //Recuperar 1
router.post('/usuarios', UsuariosControlador.añadirNuevo); //Añadir
router.put('/usuarios/:id', UsuariosControlador.modificar); //Editar
router.delete('/usuarios/:id', UsuariosControlador.eliminar); //Borrar

//Guardar la foto del perfil del usuario
router.post('/subirImagen/:id', UsuariosControlador.subirImagen);
router.get('/imagen/:imagen', UsuariosControlador.recuperarImagen);

router.post('/seguir/:id/:seguir', UsuariosControlador.seguir); //Seguir a otro usuario


module.exports = router;