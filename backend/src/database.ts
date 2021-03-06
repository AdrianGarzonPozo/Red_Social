import { mongodb } from './keys';
import mongoose from 'mongoose'

mongoose.connect(mongodb.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    socketTimeoutMS: 45000,
    keepAlive: true,
    reconnectTries: 10
})
    .then(db => console.log('Base de Datos conectada'))
    .catch(db => console.log("Error al conectarse a la Base de Datos: " + db));