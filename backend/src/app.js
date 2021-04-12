const express = require('express');
const bodyParser = require('body-parser');

var app = express();

//Cargar archivos de rutas
var usuarios_rutas = require('./rutas/usuarios');
var publicaciones_rutas = require('./rutas/publicaciones');
var comentarios_rutas = require('./rutas/comentarios');
var login_logout=require('./rutas/login_logout');

//middleware
app.use(bodyParser.urlencoded({ extended: false })); //Activar body-parser
app.use(bodyParser.json()); //Cualquier peticion que llegue la convierte a json


//cors, para cuando hagamos peticiones desde angular no de problemas ya que estara en el proyecto en produccion desde otro dominio
// Configurar cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //En * pondriamos el dominio permitido
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Todas estas rutas pasaran primero por /api
app.use('/api', usuarios_rutas);
app.use('/api', publicaciones_rutas);
app.use('/api', comentarios_rutas);
app.use('/', login_logout);

module.exports = app;