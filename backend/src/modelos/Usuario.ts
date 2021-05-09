import mongoose, { Schema, model } from 'mongoose';
var uniqueValidator = require('mongoose-unique-validator');

export interface Usuario extends mongoose.Document {
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    biografia: {
        type: String,
        required: true,
        trim: true
    },
    contrasena: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        trim: true
    },
    foto_perfil: String,
    tipo_cuenta: Boolean,
    telefono_p2p: Number,
    siguiendo: [String],
    seguidores: [String],
    publicaciones: [String]
}

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    biografia: {
        type: String,
        trim: true
    },
    contrasena: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    foto_perfil: String,
    tipo_cuenta: Boolean,
    telefono_p2p: Number,
    siguiendo: [String],
    seguidores: [String],
    publicaciones: [String]
}, {
    timestamps: true
});

UsuarioSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

export default model<Usuario>('Usuarios', UsuarioSchema);
