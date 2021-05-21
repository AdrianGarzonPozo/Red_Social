export class Usuario {
    constructor(
        public _id: string,
        public nombre: string,
        public biografia: string,
        public correo: string,
        public contrasena: string,
        public foto_perfil: string,
        public telefono_p2p: boolean
    ) { }
}
