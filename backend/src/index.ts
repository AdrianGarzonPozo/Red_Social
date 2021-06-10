//Importar
import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import "./database";
import { servidor } from './keys';
const path = require('path');
import rateLimit from 'express-rate-limit';

//Inicializaciones
const app: Application = express();

//Configuraciones
app.set('port', process.env.PORT || 3700);

//middleware
app.use(bodyParser.urlencoded({ extended: false })); //Activar body-parser
app.use(bodyParser.json()); //Cualquier peticion que llegue la convierte a json
/* app.use(cors); */
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: 'No puedes exceder de 500 peticiones cada 15 minutos',
    headers: true
});

app.use(rateLimiter);


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

app.use('/public', express.static(path.join(__dirname, 'public')));

//Encender servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en ${servidor.URI}`);
});