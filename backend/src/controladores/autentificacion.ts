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

        var fecha: Date = new Date();
        let dia: string = ("0" + fecha.getDate()).slice(-2);
        let mes: string = ("0" + (fecha.getMonth() + 1)).slice(-2);
        let año: number = fecha.getFullYear();

        const newUsuario = new usuarioModelo({
            nombre,
            correo,
            contrasena: ctr
        });

        newUsuario.tipo_cuenta = true;
        newUsuario.telefono_p2p = 0;
        newUsuario.creacion = (año + "-" + mes + "-" + dia);

        const usuarioGuardado = await newUsuario.save();

        const token = jwt.sign({ id: usuarioGuardado._id }, config.SECRET, {
            expiresIn: 86400    // en segundos -> 24horas
        });

        res.status(200).send({ token });

    }

    public async login(req: Request, res: Response) {

        const usuario = await usuarioModelo.findOne({ nombre: req.body.nombre });

        if (!usuario) return res.status(404).send({ status: 'Error Usuario' });

        const contrasena = await bcrypt.compare(req.body.contrasena, usuario.contrasena);

        if (!contrasena) return res.status(404).send({ status: 'Error Contraseña' });

        const token = jwt.sign({ id: usuario._id }, config.SECRET, {
            expiresIn: 86400
        });
 
        res.send({ token: token });

    }

}

export const autentificacionControlador = new AutentificacionControlador();