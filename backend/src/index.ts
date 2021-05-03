//Importar
import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import "./database";

//Inicializaciones
const app: Application = express();

//Configuraciones
app.set('port', process.env.PORT || 3700);

//middleware
app.use(bodyParser.urlencoded({ extended: false })); //Activar body-parser
app.use(bodyParser.json()); //Cualquier peticion que llegue la convierte a json


//Cargar archivos de rutas
const usuarios_rutas = require('./rutas/usuarios');
const publicaciones_rutas = require('./rutas/publicaciones');
const comentarios_rutas = require('./rutas/comentarios');
const autentificacion_rutas = require('./rutas/autentificacion');


//Todas estas rutas pasaran primero por /api
app.use('/api', usuarios_rutas);
app.use('/api', publicaciones_rutas);
app.use('/api', comentarios_rutas);
app.use('/api', autentificacion_rutas);


//cors, para cuando hagamos peticiones desde angular no de problemas ya que estara en el proyecto en produccion desde otro dominio
// Configurar cabeceras
app.use((req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //En * pondriamos el dominio permitido
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Encender servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en http://localhost:3700`);
});