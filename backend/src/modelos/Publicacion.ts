import mongoose, {Schema, model} from 'mongoose';

export interface Publicacion extends mongoose.Document {
    idUsuario: String,
    foto: String,
    texto_foto: String,
    fecha_publicacion: String,
    likes: [String],
    comentarios: [String]
}

var PublicacionSchema=new Schema({
    idUsuario: String,
    foto: String,
    texto_foto: String,
    fecha_publicacion: String,
    likes: [String],
    comentarios: [String]
});

export default model<Publicacion>('Publicaciones', PublicacionSchema);