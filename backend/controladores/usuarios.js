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
        const newUsuario = new usuarioModelo();

        var params = req.body;

        newUsuario.nombre = params.nombre;
        newUsuario.biografia = params.biografia;
        newUsuario.contrasena = params.biografia;
        newUsuario.correo = params.correo;
        newUsuario.foto_perfil = params.foto_perfil;
        newUsuario.tipo_cuenta = true;
        newUsuario.telefono_p2p = '0';
        newUsuario.siguiendo = [];
        newUsuario.seguidores = [];
        newUsuario.publicaciones = [];


        await new usuarioModelo(newUsuario).save((err, usuarioGuardado) => {
            if (err) return res.status(500).send({ status: 'failed' });

            if (!usuarioGuardado) return res.send(404).send({ status: '404' });

            return res.status(200).send({ status: 'success' });
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