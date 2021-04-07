var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var PublicacionesSchema=Schema({
    idUsuario: String,
    foto: String,
    texto_foto: String,
    fecha_publicacion: String,
    likes: [String],
    comentarios: [String]
});

module.exports=mongoose.model('Publicaciones', PublicacionesSchema);