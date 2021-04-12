const usuarioModelo = require('../modelos/usuarios');
const bcrypt = require('bcryptjs');

async function login(req, res) {
    try {

        const nombreUsuario = req.body.nombre;
        const contraseña = req.body.contrasena;

        const usuarios = await usuarioModelo.find({});


        usuarios.forEach(usuario => {

            if (nombreUsuario == usuario.nombre) {
                bcrypt.compare(contraseña, usuario.contrasena, (error, coinciden) => {

                    if (error) return res.status(500).send({ status: 'failed' });

                    if (coinciden) return res.status(200).send({ status: 'success' });

                    return res.status(500).send({ status: 'error' });
                });
            }

        });

    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

async function logout(req, res) {
    try {
        return res.send('ok');
    } catch (error) {
        return res.status(500).send({ status: 'failed' });
    }
}

module.exports = { login, logout }