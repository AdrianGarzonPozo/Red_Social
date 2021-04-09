var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
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

module.exports = mongoose.model('Usuarios', UsuarioSchema);
