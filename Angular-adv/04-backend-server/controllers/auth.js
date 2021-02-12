const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require ("../helpers/jwt");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        // Verificar email
        if (!usuarioDB){
            return res.json({
               ok: false,
               msg: 'Email no válido'
            });
        }

        // Verificar constraseña
        const vaildPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!vaildPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Constraseña no valida'
            });
        }

        // Generar el token JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
           ok: true,
           token
        });

    }catch (e){
        console.log(e);
        res.status(500).json({
           ok: false,
           msg: 'Error inseperado, hable con el administrador'
        });
    }
}

module.exports = {
    login
}
