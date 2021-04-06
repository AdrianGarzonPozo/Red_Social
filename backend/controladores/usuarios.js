var usuarioModelo = require('../modelos/usuarios');
var fs = require('fs');
var path = require('path');

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
        //Await
    } catch (error) {

    }
}

async function añadirNuevo(req, res) {
    try {
        const usuario = new usuarioModelo();

        var params = req.body;
        console.log(params.nombre);

        usuario.nombre = params.nombre;
        usuario.biografia = params.biografia;
        usuario.contrasena = params.biografia;
        usuario.correo = params.correo;
        usuario.foto_perfil = params.foto_perfil;
        usuario.tipo_cuenta = true;
        usuario.telefono_p2p = '0';
        usuario.siguiendo = [];
        usuario.publicaciones = [];

        await new usuarioModelo(usuario).save((err, usuarioGuardado) => {
            if (err) return res.status(500).send({ status: 'failed' });

            if (!usuarioGuardado) return res.send(404).send({ status: '404' });

            return res.status(200).send({ status: usuario });
        });


    } catch (error) {
        return res.status(500).send({ status: 'failed' });
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

async function seguir(req, res) {
    try {

    } catch (error) {
        console.log(error);
    }
}

module.exports = { recuperarTodos, recuperarUno, añadirNuevo, modificar, eliminar, subirImagen, recuperarImagen, seguir };