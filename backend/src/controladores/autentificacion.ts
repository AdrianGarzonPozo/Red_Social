import { Request, Response } from 'express';
import usuarioModelo, { Usuario } from '../modelos/Usuario';

import config from '../config';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AutentificacionControlador {

    public async registro(req: Request, res: Response) {

        const { nombre, correo, contrasena } = req.body;

        const salt = await bcrypt.genSalt(10);

        const ctr = await bcrypt.hash(contrasena, salt);


        const newUsuario = {
            nombre,
            correo,
            contrasena: ctr,
            tipo_cuenta: true,
            telefono_p2p: 0
        };


        usuarioModelo.create(newUsuario, (err, usuario) => {
            if (err != null) {
                if (err.message.includes("Error, expected nombre to be unique.")) return res.status(500).send({status:"Error usuario"});
                if (err.message.includes("Error, expected correo to be unique.")) return res.status(500).send({status:"Error correo"});
            }
            const token = jwt.sign({ id: usuario._id }, config.SECRET, {
                expiresIn: 86400    // en segundos -> 24horas
            });

            res.status(200).send({ token, usuario });
        });

    }

    public async login(req: Request, res: Response) {
        
        const usuario = await usuarioModelo.findOne({ nombre: req.body.nombre });

        if (!usuario) return res.status(404).send({ status: 'Error Usuario' });

        const contrasena = await bcrypt.compare(req.body.contrasena, usuario.contrasena);

        if (!contrasena) return res.status(404).send({ status: 'Error Contraseña' });

        const token = jwt.sign({ id: usuario._id }, config.SECRET, {
            expiresIn: 86400
        });

        res.status(200).send({ token, usuario: usuario });

    }

}

export const autentificacionControlador = new AutentificacionControlador();