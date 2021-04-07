var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComentariosSchema = Schema({
    idUsuario: String,
    texto: String,
    fecha_comentario: String
});

module.exports = mongoose.model('Comentarios', ComentariosSchema);
