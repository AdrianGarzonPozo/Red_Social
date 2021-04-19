import { Request, Response } from 'express';
import usuarioModelo, { Usuario } from '../modelos/Usuario';
const bcrypt = require('bcryptjs');

class LogControlador {

    public async login(req: Request, res: Response) {
        try {

            const nombreUsuario = req.body.nombre;
            const contraseña = req.body.contrasena;

            const usuarios = await usuarioModelo.find({});


            usuarios.forEach((usuario: Usuario) => {

                if (nombreUsuario == usuario.nombre) {
                    bcrypt.compare(contraseña, usuario.contrasena, (error: any, coinciden: any) => {

                        if (error) return res.status(500).send({ status: 'failed' });

                        if (coinciden) return res.status(200).send({ status: 'success' });

                        return res.status(500).send({ status: 'error' });
                    });
                }

            });

        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }

    public async logout(req: Request, res: Response) {
        try {
            return res.send('ok');
        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }
}

export const logControlador = new LogControlador();