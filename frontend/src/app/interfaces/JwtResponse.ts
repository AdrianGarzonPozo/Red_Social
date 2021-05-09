export interface JwtResponseI {
    token: string,
    usuario: {
        id: number,
        nombre: String,
        correo: String,
        contrasena: String,
        tipo_cuenta: boolean,
        telefono_p2p: number,
        siguiendo: [String],
        seguidores: [String],
        publicaciones: [String],
        createdAt: String,
        updatedAt: String,
    }
}
