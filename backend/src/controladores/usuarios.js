var usuarioModelo = require('../modelos/usuarios');
var fs = require('fs');
var path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');

async function recuperarTodos(req, res) {
    try {
        const usuarios = await usuarioModelo.find({});
        return res.status('200').send(usuarios && usuarios.length > 0 ? usuarios : []);
    } catch (error) {
        return res.status(500).send({ status: 'failed' });
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

        var fecha = new Date();
        let dia = ("0" + fecha.getDate()).slice(-2);
        let mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
        let año = fecha.getFullYear();

        //Se salta este paso    SOLUCIONAR
        bcrypt.hash(params.contrasena, 10, (error, palabraEncriptada) => {
            if (error) return res.status(500).send({ status: 'failed' });

            newUsuario.contrasena = palabraEncriptada;
            newUsuario.tipo_cuenta = true;
            newUsuario.telefono_p2p = '0';
            newUsuario.creacion = (año + "-" + mes + "-" + dia);
            newUsuario.siguiendo = [];
            newUsuario.seguidores = [];
            newUsuario.publicaciones = [];

            add();
            return res.status(200).send({ status: 'success' });
        });

        const add = async function añadir(req, res) {
            await new usuarioModelo(newUsuario).save((error, usuarioGuardado) => {
                console.log("hola");
                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuarioGuardado) return res.send(404).send({ status: '404' });

            });
        }


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
            destination: path.join(__dirname, '../public/uploads/foto_perfil/'),
            filename: (req, file, res) => {
                foto_perfil = req.params.id + ".jpg";
                res(null, foto_perfil);
            }
        });
        const multerMiddleware = multer({            //Subida de imagenes
            storage: storage,
            dest: path.join(__dirname, '../public/uploads/foto_perfil/'),
            limits: { fileSize: 30 * 1024 * 1024 },  //Tamaño maximo 30Mb, se borra la imagen guardada si supero los Mb SOLUCIONAR
            fileFilter: (req, file, res) => {
                const extValidas = /jpeg|jpg|png/;
                const mimetype = extValidas.test(file.mimetype); //Compruebo la extension
                const extension = extValidas.test(path.extname(file.originalname));

                if (mimetype && extension) return res(null, true);

                return res('EXT_FAILED');
            }
        }).single('foto_perfil');  //Nombre del input desde donde se subira la imagen

        multerMiddleware(req, res, (err) => {
            if (err) {
                if (err == "EXT_FAILED") return res.status(500).send({ status: "EXT_FAILED" });
                return res.status(500).send({ status: "LIMIT_SIZE" });
            }
            idUsuario = req.params.id;
            var update = { foto_perfil: foto_perfil };


            prueba();
            async function prueba(req, res) {
                await usuarioModelo.findByIdAndUpdate(idUsuario, update, { new: true }, (error, usuarioModificado) => {

                    if (error) return res.status(500).send({ status: 'failed' });

                    if (!usuarioModificado) return res.send(404).send({ status: '404' });

                });
            }

            return res.send({ status: 'success' });
        });


    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

async function recuperarImagen(req, res) {
    try {
        const idUsuario = req.params.id;
        var foto_perfil = './src/public/uploads/foto_perfil/' + idUsuario + '.jpg';
        console.log(foto_perfil);
        fs.stat(foto_perfil, (error, exists) => {
            if (exists) return res.status(200).sendFile(path.resolve(foto_perfil));
            return res.status(500).send({ status: 'failed' });
        });


    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

async function seguir(req, res) {
    try {
        const idUsuario = req.params.id;
        const idUsuarioaSeguir = req.params.seguir;

        //Se duplica el ID en el array siguiendo del idUsuario
        //Al usuario idUsuario se le añadira en el array siguiendo el usuario idUsuarioaSeguir
        await usuarioModelo.findByIdAndUpdate(idUsuario, { $push: { 'siguiendo': idUsuarioaSeguir } }, { new: true }, (error, usuarioModificado) => {

            if (error) return res.status(500).send({ status: 'failed' });

            if (!usuarioModificado) return res.send(404).send({ status: '404' });

            //Al usuario idUsuarioaSeguir se le añadira en el array seguidores el usuario idUsuario
            seguidores();
            async function seguidores(req, res) {
                await usuarioModelo.findByIdAndUpdate(idUsuarioaSeguir, { $push: { 'seguidores': idUsuario } }, { new: true }, (error, usuarioModificado) => {
                    if (error) return res.status(500).send({ status: 'failed' });

                    if (!usuarioModificado) return res.send(404).send({ status: '404' });

                });
            }
            return res.status(200).send({ status: 'success' });

        });


    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

async function dejarSeguir(req, res) {
    try {
        const idUsuario = req.params.id;
        const idUsuarionoSeguir = req.params.noseguir;

        //Al usuario idUsuario se le quitara del array siguiendo el usuario idUsuarioaSeguir
        await usuarioModelo.findByIdAndUpdate(idUsuario, { $pull: { 'siguiendo': idUsuarionoSeguir } }, { new: true }, (error, usuarioModificado) => {

            if (error) return res.status(500).send({ status: 'failed' });

            if (!usuarioModificado) return res.send(404).send({ status: '404' });

            //Al usuario idUsuarionoSeguir se le quitara del array seguidores el usuario idUsuario
            seguidores();
            async function seguidores(req, res) {
                await usuarioModelo.findByIdAndUpdate(idUsuarionoSeguir, { $pull: { 'seguidores': idUsuario } }, { new: true }, (error, usuarioModificado) => {
                    if (error) return res.status(500).send({ status: 'failed' });

                    if (!usuarioModificado) return res.send(404).send({ status: '404' });

                });
            }
            return res.status(200).send({ status: 'success' });

        });

    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

module.exports = { recuperarTodos, recuperarUno, añadirNuevo, modificar, eliminar, subirImagen, recuperarImagen, seguir, dejarSeguir };