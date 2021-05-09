export interface UsuarioI {
    id: number,
    nombre: String,
    biografia: String,
    contrasena: String,
    correo: String,
    foto_perfil: String,
    tipo_cuenta: Boolean,
    telefono_p2p: Number,
    siguiendo: [String],
    seguidores: [String],
    publicaciones: [String]
}
