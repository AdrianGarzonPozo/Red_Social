import { Request, Response } from 'express';
import comentarioModelo, { Comentario } from '../modelos/Comentario';
import publicacionModelo, { Publicacion } from '../modelos/Publicacion';
import usuarioModelo, { Usuario } from '../modelos/Usuario';

var fs = require('fs');
var path = require('path');

class ComentarioControlador {

    public async recuperarTodos(req: Request, res: Response) {
        try {
            const comentarios: Comentario[] = await comentarioModelo.find({});

            return res.status(200).send(comentarios && comentarios.length > 0 ? comentarios : []);
        } catch (error: any) {
            return res.status(500).send({ status: 'failed' });
        }
    }

    public async añadirNuevo(req: Request, res: Response) {
        try {
            const idPublicacion: string = req.params.idPublicacion;
            const idUsuario: string = req.params.idUsuario;
            var nombreUsuario: string = '';

            await usuarioModelo.findById(idUsuario, (error: string, usuario: any) => {
                nombreUsuario = usuario.nombre;
            });


            var fecha: Date = new Date();
            let dia: String = ("0" + fecha.getDate()).slice(-2);
            let mes: String = ("0" + (fecha.getMonth() + 1)).slice(-2);
            let año: Number = fecha.getFullYear();

            var nuevoComentario: any = req.body;
            nuevoComentario.nombreUsuario = nombreUsuario;
            nuevoComentario.fecha_comentario = año + "-" + mes + "-" + dia;

            const addComentario: Comentario = new comentarioModelo(nuevoComentario);

            //Se duplican al guardarlos en el array comentarios
            await publicacionModelo.findByIdAndUpdate(idPublicacion, { $push: { 'comentarios': addComentario._id } }, { new: true }, (error: string, comentario: any) => {
                if (error) return res.status(500).send({ status: 'failed' });

                if (!comentario) return res.status(404).send({ status: '404' });

            });


            await addComentario.save((error, comentario) => {
                if (error) return res.status(500).send({ status: 'failed' });

                if (!comentario) return res.status(404).send({ status: '404' });
            });

            return res.status(200).send({ status: 'success' });

        } catch (error) {
            if (error) return res.status(500).send({ status: 'failed' });
        }
    }


    public async eliminar(req: Request, res: Response) {
        try {

            const idPublicacion: string = req.params.idPublicacion;
            const idComentario: string = req.params.idComentario;

            await comentarioModelo.findByIdAndRemove(idComentario, {}, (error: any, comentarioBorrado: any) => {
                if (error) return res.status(500).send({ status: 'failed' });

                if (!comentarioBorrado) return res.status(404).send({ status: '404' });

            });

            await publicacionModelo.findByIdAndUpdate(idPublicacion, { $pull: { 'comentarios': idComentario } }, { new: true }, (error: String, comentario: any) => {
                
                if (error) return res.status(500).send({ status: 'failed' });

                if (!comentario) return res.status(404).send({ status: '404' });
            });

            return res.status(200).send({ status: 'success' });


        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }

}

export const comentarioControlador = new ComentarioControlador();