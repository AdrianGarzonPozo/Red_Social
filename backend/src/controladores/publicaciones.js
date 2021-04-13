var publicacionModelo = require('../modelos/publicaciones');
var usuarioModelo = require('../modelos/usuarios');
var fs = require('fs');
var path = require('path');


async function recuperarTodas(req, res) {
    try {
        const publicaciones = await publicacionModelo.find({});

        return res.status(200).send(publicaciones && publicaciones.length > 0 ? publicaciones : []);
    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

async function recuperarUna(req, res) {
    try {
        const idPublicacion = req.params.id;

        publicacionModelo.findById(idPublicacion, (error, publicacion) => {
            if (error) return res.status(500).send({ status: 'failed' });

            if (!publicacion) return res.status(500).send({ status: 'failed' });

            return res.status(200).send(publicacion);
        });

    } catch (error) {

    }
}

async function añadirNueva(req, res) {
    try {
        const idUsuario = req.params.idUsuario;

        var fecha = new Date();
        let dia = ("0" + fecha.getDate()).slice(-2);
        let mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
        let año = fecha.getFullYear();

        const nuevaPublicacion = req.body;
        nuevaPublicacion.idUsuario = idUsuario;
        nuevaPublicacion.fecha_publicacion = año + "-" + mes + "-" + dia;
        nuevaPublicacion.likes = [];
        nuevaPublicacion.comentarios = [];

        const addPublicacion = new publicacionModelo(nuevaPublicacion);

        //A VECES SE GUARDAR x2 EN EL ARRAY PUBLICACIONES   SOLUCIONAR 
        await usuarioModelo.findByIdAndUpdate(idUsuario, { $push: { 'publicaciones': addPublicacion._id } }, { new: true }, (error, usuarioModificado) => {

            if (error) return res.status(500).send({ status: 'failed' });

            if (!usuarioModificado) return res.status(500).send({ status: 'failed' });

            añadir();
            async function añadir(req, res) {
                await addPublicacion.save((error, publicacion) => {
                    if (error) return res.status(500).send({ status: 'failed' });

                    if (!publicacion) return res.status(500).send({ status: 'failed' });
                });
            }

            return res.status(200).send({ status: 'success' });
        });

    } catch (error) {
        if (error) return res.status(500).send({ status: 'failed' });
    }
}

async function modificar(req, res) {
    try {

        idPublicacion = req.params.id;
        textoNuevo = req.body.texto_foto;

        await publicacionModelo.findByIdAndUpdate(idPublicacion, { texto_foto: textoNuevo }, { new: true }, (error, publicacion) => {

            if (error) return res.status(500).send({ status: 'failed' });

            if (!publicacion) return res.status(500).send({ status: 'failed' });

            return res.status(200).send(publicacion);
        });



    } catch (error) {
        if (error) return res.status(500).send({ status: 'failed' });
    }
}

async function eliminar(req, res) {
    try {

        idUsuario = req.params.idUsuario;
        idPublicacion = req.params.id;

        await usuarioModelo.findByIdAndUpdate(idUsuario, { $pull: { 'publicaciones': idPublicacion } }, { new: true }, (error, usuario) => {
        
            if (error) return res.status(500).send({ status: 'failed' });

            if (!usuario) return res.send(500).send({ status: 'failed' });
    
            borrar();
            async function borrar(req, res) {
            
                await publicacionModelo.findByIdAndDelete(idPublicacion, (err, publicacion) => {
                  
                    if (err) return res.status(500).send({ status: 'failed' });

                    if (!publicacion) return res.send(500).send({ status: 'failed' });

                });
            }
            return res.status(200).send({ status: 'success' });

        });

    } catch (error) {
        if (error) return res.status(500).send({ status: 'failed' });
    }
}

async function subirImagen(req, res) {
    try {
        //Await
    } catch (error) {

    }
}

async function recuperarImagen(req, res) {
    try {
        //Await
    } catch (error) {

    }
}

module.exports = { recuperarTodas, recuperarUna, añadirNueva, modificar, eliminar, subirImagen, recuperarImagen };