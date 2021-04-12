var publicacionModelo = require('../modelos/publicaciones');
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
        //Await
    } catch (error) {

    }
}

async function añadirNueva(req, res) {
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

module.exports = { recuperarTodas, recuperarUna, añadirNueva, modificar, eliminar, subirImagen, recuperarImagen };