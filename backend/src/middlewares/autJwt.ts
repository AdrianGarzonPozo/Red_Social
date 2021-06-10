import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import config from '../config';
import Usuario from '../modelos/Usuario';

export const verifToken = async (req: Request, res: Response, next: any) => {
    try {
        if(!req.headers.authorization){
            return res.status(403).send({status:'cabecera'});
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) return res.status(403).send({ status: 'No token' });

        const decoded = jwt.verify(token, config.SECRET);

        const user = await Usuario.findById(decoded.id, { contrasena: 0 });
        if (!user) return res.status(404).send({ status: 'User Failed' });

        next(); //Para que seiga con la siguiente funcion
    } catch (error) {
        return res.status(404).send({ status: 'Token Failed' });
    }
}