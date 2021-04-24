import { mongodb } from './keys';
import mongoose from 'mongoose'

mongoose.connect(mongodb.URI, {
    useNewUrlParser: true
})
    .then(db=> console.log('Base de Datos conectada'))
    .catch(db=>console.log("Error al conectarse a la Base de Datos"));