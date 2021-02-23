const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require ("../helpers/jwt");

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.param) || 0;

    /**
     * Debido a que son dos promesas, el hacer el await para cada una de ellas hace ineficiente tener que esperar
     * por ambas debido a que pueden tardar mas de lo normal, es por ello que se hace el uso de Promise.all()
     * con la finalidad de ejecutar todas las promesas pero de manera simultanea en vez de esperar 1 por 1
     */
    const [ usuarios, total ] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
            .skip(desde)// Desde que numero queremos los usuarios
            .limit(5),// limite desde el numero por ejemplo desde el 5 hasta el 10 de los usuarios
        Usuario.countDocuments()// Total de registros
    ]);

    res.json({
        ok: true,
        usuarios: usuarios,
        uid: req.uid,
        total
    });
}

const crearUsuario = async (req, res = response) => {

    //Aqui se recogen los valores de la peticion o request del usuario
    const {nombre, password, email} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
               ok: false,
               msg: 'El correo ya está registrado'
            });
        }

        // Instancia que tiene todas las propiedades de email password y nombre
        const usuario = new Usuario(req.body);

        // Encriptar constraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar en la base de datos
        //Debido a que esto no se ejecuta de inmediato, debemos especificar a node que se espere a que guarde el usuario
        await usuario.save();

        // Generar el token JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }

}

const actualizarUsuario = async (req, res = response) =>{

    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese ID'
            });
        }

        // Actualizacion
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail){
                return res.status(400).json({
                   ok: false,
                   msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    }catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try{

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese ID'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: `Servicio ${borrarUsuario.name} funcionando`
        });
    }catch (e) {
        console.log('Error en el servidor');
        res.status(500).json({
            ok: false,
            msg: 'Error interno en el servidor, contacte con el administrador'
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
