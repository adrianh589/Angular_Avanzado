const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {googleVerify} = require ("../helpers/google-verify");
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

const GoogleSignIn = async ( req, res = response ) =>  {

    const googleToken = req.body.token;

    try{

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB){
            // Si no existe el usuario
            usuario = new Usuario({
               nombre: name,
               email,
               password: '@@@',
               img: picture,
                google: true
            });
        } else{
            // Existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en base de datos
        await usuario.save();

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            token
        });
    }catch (e){
        res.status(401).json({
            ok: false,
            msg: 'El token de google no es correcto'
        });
    }

}

module.exports = {
    login,
    GoogleSignIn
}
