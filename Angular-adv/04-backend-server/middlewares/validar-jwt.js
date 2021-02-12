/*
los middlewares son como cualquier controlador solo que tienen el metodo next, admeas son funciones
que se ejecutan antes de otras

next: next es la funcion que se llama si todo sale correctamente, si no llamamos al next
se dara la impresion de que la api no funciona, es por ello que se debe poner si o si cuando
es un middleware
 */

const jwt = require('jsonwebtoken');

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

module.exports ={
    validarJWT
}
