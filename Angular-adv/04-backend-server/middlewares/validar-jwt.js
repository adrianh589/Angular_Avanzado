/*
los middlewares son como cualquier controlador solo que tienen el metodo next, admeas son funciones
que se ejecutan antes de otras

next: next es la funcion que se llama si todo sale correctamente, si no llamamos al next
se dara la impresion de que la api no funciona, es por ello que se debe poner si o si cuando
es un middleware
 */

const jwt = require('jsonwebtoken');
const Usuario = require ('../models/usuario');

const validarJWT = (req, res, next) =>{

    // Leer el token
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
           ok: false,
           msg: 'No hay token en la petición'
        });
    }
    
    try{

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();

    }catch (e) {
        return res.status(401).json({
           ok: false,
           msg: 'Token no válido'
        });
    }
}

const validarADMIN_ROLE = async (req, res, next) => { 

    const uid = req.uid;

    try{

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }
        
        // Este next lo que hace es dejar pasar las validaciones
        next();

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

} 

const validarADMIN_ROLE_o_mismousuario = async (req, res, next) => { 

    const uid = req.uid;
    const id = req.params.id;

    try{

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.role === 'ADMIN_ROLE' || uid === id ){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }
        
        // Este next lo que hace es dejar pasar las validaciones
        next();

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

} 

module.exports ={
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_mismousuario
}
