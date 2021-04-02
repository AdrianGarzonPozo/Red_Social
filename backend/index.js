var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@localhost:27017/red_social?authSource=admin')
    .then(() => {
        console.log("Conexión a la bbdd establecida con exito . . .");
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:3700');
        });
    })
    .catch(err => console.log(err));