import { Request, Response } from 'express';
import ComentarioModelo, { Comentario } from '../modelos/Comentario';

var fs = require('fs');
var path = require('path');

class ComentarioControlador {

    public async recuperarTodos(req: Request, res: Response) {
        try {
            //Await
        } catch (error) {

        }  
    }

    public async añadirNuevo(req: Request, res: Response) {
        try {
            //Await
        } catch (error) {

        }
    }

    public async eliminar(req: Request, res: Response) {
        try {
            //Await
        } catch (error) {

        }
    }
}

export const comentarioControlador = new ComentarioControlador();