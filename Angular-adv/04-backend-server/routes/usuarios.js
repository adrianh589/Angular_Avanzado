/*
    Ruta: /api/usuarios
*/

const {validarJWT,
     validarADMIN_ROLE,
    validarADMIN_ROLE_o_mismousuario
    } = require ("../middlewares/validar-jwt");
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', validarJWT,getUsuarios);
// El segundo argumento son middlewares los cuales son funciones que se ejecutan antes de otras
// Si son varios usamos [] en caso contrario los omitimos
router.post(
    '/',
    [
        // El primer argumento revisa el campo de la request, el segundo es el mensaje personalizado en caso de error
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario
);

router.put('/:id',
    [
        validarJWT,
        validarADMIN_ROLE_o_mismousuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario)

router.delete('/:id', 
    [validarJWT, validarADMIN_ROLE], 
    borrarUsuario
);

module.exports = router;
