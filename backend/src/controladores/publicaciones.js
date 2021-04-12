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
        const idPublicacion=req.params.id;

        publicacionModelo.findById(idPublicacion, (error,publicacion)=>{
            if (error) return res.status(500).send({ status: 'failed' });

            if (!publicacion) return res.status(500).send({ status: 'failed' });

            return res.status(200).send(publicacion);
        });

    } catch (error) {

    }
}

async function añadirNueva(req, res) {
    try {
        const idUsuario=req.params.idUsuario;

        var fecha = new Date();
        let dia = ("0" + fecha.getDate()).slice(-2);
        let mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
        let año = fecha.getFullYear();

        const nuevaPublicacion=req.body;
        nuevaPublicacion.idUsuario=idUsuario;
        nuevaPublicacion.fecha_publicacion=año+"-"+mes+"-"+dia;
        nuevaPublicacion.likes=[];
        nuevaPublicacion.comentarios=[];

        const addPublicacion=new publicacionModelo(nuevaPublicacion);

        //A VECES SE GUARDAR x2 EN EL ARRAY PUBLICACIONES   SOLUCIONAR 
        await usuarioModelo.findByIdAndUpdate(idUsuario, { $push: { 'publicaciones': addPublicacion._id } }, { new: true }, (error, usuarioModificado) => {
         
            if (error) return res.status(500).send({ status: 'failed' });

            if (!usuarioModificado) return res.status(500).send({ status: 'failed' });

            addPublicacion.save((error,publicacion)=>{
                if (error) return res.status(500).send({ status: 'failed' });

                if (!publicacion) return res.status(500).send({ status: 'failed' });
            });

            return res.status(200).send({status:'success'});
        });

       /*  await new publicacionModelo(nuevaPublicacion).save((error,publicacion)=>{
            if (error) return res.status(500).send({ status: 'failed' });

            if (!publicacion) return res.status(500).send({ status: 'failed' });

            console.log("2");

            usuarioModelo.findByIdAndUpdate(idUsuario, { $push: { 'publicaciones': publicacion._id } }, { new: true }, (error, usuarioModificado) => {
                console.log("1");
                if (error) return res.status(500).send({ status: 'failed' });

                if (!usuarioModificado) return res.status(500).send({ status: 'failed' });
            });

            return res.status(200).send({status:'success'});
        });
 */

    } catch (error) {

    }
}

async function modificar(req, res) {
    try {
        //Await
    } catch (error) {

    }
}

async function eliminar(req, res) {
    try {
        //Await
    } catch (error) {

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