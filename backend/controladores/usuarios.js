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
        const idUsuario=req.params.id;

        await usuarioModelo.findById(idUsuario,(error,usuarioRecuperado)=>{
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
        newUsuario=params;  //Llega por formulario el nombre, biografia, contraseña, correo, foto_perfil

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
        const idUsuario=req.params.id;
        const update=req.body;

        await usuarioModelo.findByIdAndUpdate(idUsuario, update, {new:true}, (error,usuarioModificado)=>{
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
        const idUsuario=req.params.id;

        await usuarioModelo.findByIdAndDelete(idUsuario, (error,usuarioBorrado)=>{
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