import mongoose, {Schema, model} from 'mongoose';

export interface Usuario extends mongoose.Document {
    nombre: String,
    biografia: String,
    contrasena: String,
    correo: String,
    foto_perfil: String,
    tipo_cuenta: Boolean,
    telefono_p2p: Number,
    creacion: String,
    siguiendo: [String],
    seguidores: [String],
    publicaciones: [String]
} 

var UsuarioSchema = new Schema({
    nombre: String,
    biografia: String,
    contrasena: String,
    correo: String,
    foto_perfil: String,
    tipo_cuenta: Boolean,
    telefono_p2p: Number,
    creacion: String,
    siguiendo: [String],
    seguidores: [String],
    publicaciones: [String]
});

export default model<Usuario>('Usuarios', UsuarioSchema);
