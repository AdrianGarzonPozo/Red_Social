import { Request, Response } from 'express';
import usuarioModelo, { Usuario } from '../modelos/Usuario';

import fs from 'fs';
import path from 'path';
import multer from 'multer';


class UsuarioControlador {

    public async recuperarTodos(req: Request, res: Response): Promise<Usuario[] | object> {
        try {
            const usuarios: Usuario[] = await usuarioModelo.find({});
            return res.status(200).send(usuarios && usuarios.length > 0 ? usuarios : []);
        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }

    public async recuperarUno(req: Request, res: Response): Promise<any> {

        try {
            const idUsuario: String = req.params.idUsuario;

            await usuarioModelo.findById(idUsuario, (error: any, usuarioRecuperado: Usuario) => {
                if (error) return res.status(500).send({ status: 'failed' });
                if (!usuarioRecuperado) return res.status(404).send({ status: '404' });

                return res.status(200).send(usuarioRecuperado);

            });

        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }

    public async modificar(req: Request, res: Response): Promise<any> {
        try {
            const idUsuario: String = req.params.idUsuario;
            const update: Usuario = req.body;

            await usuarioModelo.findByIdAndUpdate(idUsuario, update, { new: true }, (error: string, usuarioModificado): Object => {
                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuarioModificado) return res.send(404).send({ status: '404' });

                return res.status(200).send({ status: 'success' });
            });
            return res.status(500).send({ status: 'failed' });

        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }

    //error,usuarioBorrado -> typescript
    public async eliminar(req: Request, res: Response): Promise<any> {
        try {
            const idUsuario: String = req.params.idUsuario;

            await usuarioModelo.findByIdAndDelete(idUsuario, {}, (error: any, usuarioBorrado: any) => {
                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuarioBorrado) return res.status(404).send({ status: '404' });

                return res.status(200).send({ status: 'success' });
            });

        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }

    public async subirImagen(req: Request, res: Response): Promise<any> {

        try {
            const idUsuario: String = req.params.idUsuario;

            var storage = multer.diskStorage({
                destination: path.join(__dirname, '../public/uploads/foto_perfil'),
                filename: (req: Request, file: Express.Multer.File, cb: any) => {
                    cb(null, idUsuario + '.jpg');
                }
            });
            var upload = multer({
                storage: storage,
                dest: path.join(__dirname, '../public/uploads/foto_perfil'),
                limits: { fileSize: 30000000 },  //maximo 30Mb
                fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
                    const imgVal = /jpeg|jpg|png/;
                    const mimetype = imgVal.test(file.mimetype);   //Comprueba que el archivo que llega tiene la extension correcta
                    const extName = imgVal.test(path.extname(file.originalname));

                    if (mimetype && extName) {
                        return cb(null, true);
                    }
                    cb("EXT_FAILED");
                }
            }).single('foto_perfil'); //Nombre del input que sube la imagen

            upload(req, res, (error: string) => {
                if (error) {
                    if (error == "EXT_FAILED") return res.status(500).send({ status: "EXT_FAILED" });
                    return res.status(500).send({ status: "LIMIT_SIZE" });
                }

                usuarioModelo.findByIdAndUpdate(idUsuario, { foto_perfil: idUsuario + '.jpg' }, { new: true }, (error: string, usuario: any) => {
                    if (error) return res.status(500).send({ status: 'failed' });

                    if (!usuario) return res.send(404).send({ status: '404' });
                });

                return res.status(200).send({ status: 'success' });
            });

        } catch (error) {
            res.status(500).send({ status: 'failed' });
        }
    }

    public async recuperarImagen(req: Request, res: Response) {
        try {
            const idUsuario = req.params.idUsuario;
            var foto_perfil = './src/public/uploads/foto_perfil/' + idUsuario + '.jpg';

            fs.stat(foto_perfil, (error: any, exists: any) => {
                if (exists) return res.status(200).send({ status: idUsuario + '.jpg' });
                return res.status(404).send({ status: '404' });
            });


        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }

    public async seguir(req: Request, res: Response) {
        try {
            const idUsuario: String = req.params.idUsuario;
            const idUsuarioaSeguir: String = req.params.idSeguir;

            //Se duplica el ID en el array siguiendo del idUsuario
            //Al usuario idUsuario se le añadira en el array siguiendo el usuario idUsuarioaSeguir
            await usuarioModelo.findByIdAndUpdate(idUsuario, { $push: { 'siguiendo': idUsuarioaSeguir } }, { new: true }, (error: string, usuarioModificado: any) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuarioModificado) return res.status(404).send({ status: '404' });

            });

            //Al usuario idUsuarioaSeguir se le añadira en el array seguidores el usuario idUsuario
            await usuarioModelo.findByIdAndUpdate(idUsuarioaSeguir, { $push: { 'seguidores': idUsuario } }, { new: true }, (error: string, usuarioModificado: any) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuarioModificado) return res.status(404).send({ status: '404' });

            });

            return res.status(200).send({ status: 'success' });


        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }

    public async dejarSeguir(req: Request, res: Response) {
        try {
            const idUsuario: String = req.params.idUsuario;
            const idUsuarionoSeguir: String = req.params.idNoSeguir;

            //Al usuario idUsuario se le quitara del array siguiendo el usuario idUsuarioaSeguir
            await usuarioModelo.findByIdAndUpdate(idUsuario, { $pull: { 'siguiendo': idUsuarionoSeguir } }, { new: true }, (error: string, usuarioModificado) => {

                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuarioModificado) return res.send(404).send({ status: '404' });

            });


            //Al usuario idUsuarionoSeguir se le quitara del array seguidores el usuario idUsuario
            await usuarioModelo.findByIdAndUpdate(idUsuarionoSeguir, { $pull: { 'seguidores': idUsuario } }, { new: true }, (error: string, usuarioModificado) => {
                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuarioModificado) return res.send(404).send({ status: '404' });

            });

            return res.status(200).send({ status: 'success' });

        } catch (error) {
            return res.status(500).send({ status: 'failed' });
        }
    }
}


export const usuarioControlador = new UsuarioControlador();