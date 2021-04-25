import { Request, Response } from 'express';
import publicacionModelo, { Publicacion } from '../modelos/Publicacion';
import usuarioModelo, { Usuario } from '../modelos/Usuario';

var fs = require('fs');
var path = require('path');
const multer = require('multer');

class PublicacionControlador {
    public async recuperarTodas(req: Request, res: Response): Promise<Publicacion[] | Object> {
        try {
            const publicaciones: Publicacion[] = await publicacionModelo.find({});

            return res.status(200).send(publicaciones && publicaciones.length > 0 ? publicaciones : []);
        } catch (error: any) {
            return res.status(500).send({ status: 'failed' });
        }
    }

    public async recuperarUna(req: Request, res: Response): Promise<any> {
        try {
            const idPublicacion: String = req.params.idPublicacion;

            publicacionModelo.findById(idPublicacion, (error: string, publicacion: Publicacion) => {
                if (error) return res.status(500).send({ status: 'failed' });

                if (!publicacion) return res.status(404).send({ status: '404' });

                return res.status(200).send({ publicacion });
            });

        } catch (error: any) {
            if (error) return res.status(500).send({ status: 'failed' });
        }
    }

    public async añadirNueva(req: Request, res: Response): Promise<any> {
        try {
            const idUsuario: string = req.params.idUsuario;

            var fecha: Date = new Date();
            let dia: String = ("0" + fecha.getDate()).slice(-2);
            let mes: String = ("0" + (fecha.getMonth() + 1)).slice(-2);
            let año: Number = fecha.getFullYear();

            const nuevaPublicacion: any = req.body;
            nuevaPublicacion.idUsuario = idUsuario;
            nuevaPublicacion.fecha_publicacion = año + "-" + mes + "-" + dia;
            nuevaPublicacion.likes = [];
            nuevaPublicacion.comentarios = [];

            const addPublicacion = new publicacionModelo(nuevaPublicacion);

            //A VECES SE GUARDAR x2 EN EL ARRAY PUBLICACIONES   SOLUCIONAR 
            await usuarioModelo.findByIdAndUpdate(idUsuario, { $push: { 'publicaciones': addPublicacion._id } }, { new: true }, (error: string, usuarioModificado: any) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuarioModificado) return res.status(404).send({ status: '404' });

            });


            await addPublicacion.save((error, publicacion) => {
                if (error) return res.status(500).send({ status: 'failed' });

                if (!publicacion) return res.status(404).send({ status: '404' });
            });


            return res.status(200).send({ status: 'success' });

        } catch (error: any) {
            if (error) return res.status(500).send({ status: 'failed' });
        }
    }

    public async modificar(req: Request, res: Response): Promise<any> {
        try {

            const idPublicacion: String = req.params.idPublicacion;
            const textoNuevo: String = req.body.texto_foto;

            await publicacionModelo.findByIdAndUpdate(idPublicacion, { texto_foto: textoNuevo }, { new: true }, (error: string, publicacion: any) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!publicacion) return res.status(404).send({ status: '404' });

                return res.status(200).send({ status: 'success' });
            });

        } catch (error: any) {
            if (error) return res.status(500).send({ status: 'failed' });
        }
    }

    
    public async eliminar(req: Request, res: Response) {
        try {

            const idUsuario: String = req.params.idUsuario;
            const idPublicacion: String = req.params.idPublicacion;
            
            await publicacionModelo.findByIdAndDelete(idPublicacion, {}, (error: any, publicacion: any) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!publicacion) return res.status(404).send({ status: '404' });

            });
            
            await usuarioModelo.findByIdAndUpdate(idUsuario, { $pull: { 'publicaciones': idPublicacion } }, { new: true }, (error: String, usuario: any) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuario) return res.status(404).send({ status: '404' });

            });

            return res.status(200).send({ status: 'success' });


        } catch (error:any) {
            if (error) return res.status(500).send({ status: 'failed' });
        }
    } 

    public async subirImagen(req: Request, res: Response) {
        try {
            const idPublicacion: String = req.params.idPublicacion;

            const storage = multer.diskStorage({
                destination: path.join(__dirname, '../public/uploads/foto_publicacion'),
                filename: (req: Request, file: any, cb: any) => {
                    console.log("1");
                    cb(null, idPublicacion + '.jpg');
                }
            });
            const upload = multer({
                storage: storage,
                dest: path.join(__dirname, '../public/uploads/foto_publicacion'),
                limits: { fileSize: 30000000 },  //maximo 30Mb
                fileFilter: (req: Request, file: any, cb: any) => {
                    const imgVal = /jpeg|jpg|png/;
                    const mimetype = imgVal.test(file.mimetype);   //Comprueba que el archivo que llega tiene la extension correcta
                    const extName = imgVal.test(path.extname(file.originalname));
                    console.log("2");
                    if (mimetype && extName) {
                        return cb(null, true);
                    }
                    cb("EXT_FAILED");
                }
            }).single('foto_publicacion'); //Nombre del input que sube la imagen

            upload(req, res, (error: string) => {
                if (error) {
                    if (error == "EXT_FAILED") return res.status(500).send({ status: "EXT_FAILED" });
                    return res.status(500).send({ status: "LIMIT_SIZE" });
                }

                publicacionModelo.findByIdAndUpdate(idPublicacion, { foto: idPublicacion + '.jpg' }, { new: true }, (error: string, publicacion: any) => {
                    if (error) return res.status(500).send({ status: 'failed' });

                    if (!publicacion) return res.send(404).send({ status: '404' });
                    console.log("3");
                });

                console.log("4");
                return res.status(200).send({ status: 'success' });
            });

        } catch (error:any) {
            if (error) return res.status(500).send({ status: 'failed' });
        }
    }

    public async recuperarImagen(req: Request, res: Response) {
        try {
            const idPublicacion = req.params.idPublicacion;
            var foto_publicacion = './src/public/uploads/foto_publicacion/' + idPublicacion + '.jpg';

            fs.stat(foto_publicacion, (error: string, exists: any) => {
                if (exists) return res.status(200).sendFile(path.resolve(foto_publicacion));
                return res.status(500).send({ status: 'failed' });
            });


        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }

    public async like(req: Request, res: Response) {

        try {
            const idUsuario: String = req.params.idUsuario;
            const idPublicacion: String = req.params.idPublicacion;

            await usuarioModelo.find({ _id: idUsuario }, (error: string, usuario: any) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuario) return res.status(404).send({ status: '404' });

            });

            //Se duplica    SOLUCIONAR
            await publicacionModelo.findByIdAndUpdate(idPublicacion, { $push: { 'likes': idUsuario } }, { new: true }, (error, publicacion) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!publicacion) return res.status(404).send({ status: '404' });

            });

            return res.status(200).send({ status: 'success' });

        } catch (error: any) {
            if (error) return res.status(500).send({ status: 'failed' });
        }

    }

    public async disLike(req: Request, res: Response) {

        try {
            const idUsuario: String = req.params.idUsuario;
            const idPublicacion: String = req.params.idPublicacion;

            await usuarioModelo.find({ _id: idUsuario }, (error: String, usuario: any) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuario) return res.status(404).send({ status: '404' });

            });

            await publicacionModelo.findByIdAndUpdate(idPublicacion, { $pull: { 'likes': idUsuario } }, { new: true }, (error, publicacion) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!publicacion) return res.status(404).send({ status: '404' });

            });

            return res.status(200).send({ status: 'success' });

        } catch (error: any) {
            if (error) return res.status(500).send({ status: 'failed' });
        }

    }
}

export const publicacionControlador = new PublicacionControlador();