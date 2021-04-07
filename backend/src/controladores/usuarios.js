var usuarioModelo = require('../modelos/usuarios');
var fs = require('fs');
var path = require('path');
const multer = require('multer');

async function recuperarTodos(req, res) {
    try {
        const usuarios = await usuarioModelo.find({});
        return res.status('200').send(usuarios && usuarios.length > 0 ? usuarios : []);
    } catch (error) {
        return res.status(400).send({
            status: 'failure'
        });
    }
}

async function recuperarUno(req, res) {

    try {
        const idUsuario = req.params.id;

        await usuarioModelo.findById(idUsuario, (error, usuarioRecuperado) => {
            if (error) return res.status(500).send({ status: 'failed' });
            if (!usuarioRecuperado) return res.status(404).send({ status: '404' });

            return res.status(200).send(usuarioRecuperado);

        });

    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

async function añadirNuevo(req, res) {
    try {

        var params = req.body;
        newUsuario = params;  //Llega por formulario el nombre, biografia, contraseña, correo, foto_perfil

        newUsuario.tipo_cuenta = true;
        newUsuario.telefono_p2p = '0';
        newUsuario.siguiendo = [];
        newUsuario.seguidores = [];
        newUsuario.publicaciones = [];


        await new usuarioModelo(newUsuario).save((error, usuarioGuardado) => {
            if (error) return res.status(500).send({ status: 'failed' });

            if (!usuarioGuardado) return res.send(404).send({ status: '404' });

            return res.status(200).send({ status: 'success' });
        });


    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

async function modificar(req, res) {
    try {
        const idUsuario = req.params.id;
        const update = req.body;

        await usuarioModelo.findByIdAndUpdate(idUsuario, update, { new: true }, (error, usuarioModificado) => {
            if (error) return res.status(500).send({ status: 'failed' });

            if (!usuarioModificado) return res.send(404).send({ status: '404' });

            return res.status(200).send(usuarioModificado);
        });

    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

async function eliminar(req, res) {
    try {
        const idUsuario = req.params.id;

        await usuarioModelo.findByIdAndDelete(idUsuario, (error, usuarioBorrado) => {
            if (error) return res.status(500).send({ status: 'failed' });

            if (!usuarioBorrado) return res.status(404).send({ status: '404' });

            return res.status(200).send(usuarioBorrado);
        });

    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}




async function subirImagen(req, res) {
    try {
        //Subir imagen al servidor

        var idUsuario = ''
        var foto_perfil = '';

        const storage = multer.diskStorage({
            destination: path.join(__dirname, '../public/uploads/foto_perfil'),
            filename: (req, file, res) => {
                foto_perfil = req.params.id + path.extname(file.originalname).toLowerCase();
                res(null, foto_perfil);
            }
        });
        const multerMiddleware = multer({            //Subida de imagenes
            storage: storage,
            dest: path.join(__dirname, '../public/uploads/foto_perfil'),
            limits: { fileSize: 30000000 },             //Tamaño maximo 30Mb
            fileFilter: (req, file, res) => {
                const extValidas = /jpeg|jpg|png/;
                const mimetype = extValidas.test(file.mimetype); //Compruebo la extension
                const extension = extValidas.test(path.extname(file.originalname));

                if (mimetype && extension) {
                    console.log(req.params.id);
                    console.log(path.extname(file.originalname).toLowerCase());

                    //PARA BORRAR LA FOTO ANTERIOR
                    /* usuarioModelo.findById(req.params.id, (error, usuario) => {
                        console.log(usuario);
                        fs.unlinkSync(path.join(__dirname, '../public/uploads/foto_perfil/' + req.params.id + path.extname(file.originalname).toLowerCase()));
                        console.log("2");
                    }); */

                    console.log("1");
                    return res(null, true);
                }
                return res('Extension');
            }
        }).single('foto_perfil');  //Nombre del input desde donde se subira la imagen

        multerMiddleware(req, res, (err) => {
            if (err) {
                return res.send({ status: err });
            }
            idUsuario = req.params.id;
            var update = { foto_perfil: foto_perfil };


            return res.send(prueba());
            async function prueba(req, res) {
                await usuarioModelo.findByIdAndUpdate(idUsuario, update, { new: true }, (error, usuarioModificado) => {

                    console.log("sdfsd");
                    if (error) return res.status(500).send({ status: 'failed' });

                    if (!usuarioModificado) return res.send(404).send({ status: '404' });

                    /* return res.status(200).send(usuarioModificado); */
                    return "hola";
                });
            }

        });


    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

async function recuperarImagen(req, res) {
    try {
        //Await
    } catch (error) {

    }
}

async function seguir(req, res) {
    try {

    } catch (error) {
        console.log(error);
    }
}

module.exports = { recuperarTodos, recuperarUno, añadirNuevo, modificar, eliminar, subirImagen, recuperarImagen, seguir };