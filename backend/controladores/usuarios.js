var usuarios = require('../modelos/usuarios');
var fs = require('fs');
var path = require('path');

async function recuperarTodos(req, res) {
    try {
        usuarios.find({}).exec((err, usuarios) => {

            if (err) return res.status(200).send({ status: 'failure' });
            if (!usuarios) return res.status(404).send({ status: 'failure' });

            return res.status(200).send({ usuarios });

        });
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
        //Await
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

module.exports = { recuperarTodos, recuperarUno, añadirNuevo, modificar, eliminar, subirImagen, recuperarImagen };