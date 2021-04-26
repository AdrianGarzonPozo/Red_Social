import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import config from '../config';
import Usuario from '../modelos/Usuario';

export const verifToken = async (req: Request, res: Response, next: any) => {
    try {
        const token = req.headers["x-access-token"];

        console.log(token);

        if (!token) return res.status(403).send({ status: 'No token' });

        const decoded = jwt.verify(token, config.SECRET);
        console.log(decoded);

        const user = await Usuario.findById(decoded.id, { contrasena: 0 });
        console.log(user);
        if (!user) return res.status(404).send({ status: 'User Failed' });

        next(); //Para que seiga con la siguiente funcion
    } catch (error) {
        return res.status(404).send({ status: 'Token Failed' });
    }
}