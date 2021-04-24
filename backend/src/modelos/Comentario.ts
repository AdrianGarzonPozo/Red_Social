import mongoose, {Schema, model} from 'mongoose';

export interface Comentario extends mongoose.Document{
    nombreUsuario: String,
    texto: String,
    fecha_comentario: String
}

var ComentarioSchema = new Schema({
    nombreUsuario: String,
    texto: String,
    fecha_comentario: String
});

export default model<Comentario>('Comentarios', ComentarioSchema);
