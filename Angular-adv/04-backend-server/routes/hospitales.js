/*
    Path: /api/hospitales
 */

const {validarJWT} = require ("../middlewares/validar-jwt");
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getHospitales, crearHospitales, borrarHospital, actualizarHospital } = require('../controllers/hospitales');

const router = Router();

router.get('/', getHospitales);

// El segundo argumento son middlewares los cuales son funciones que se ejecutan antes de otras
// Si son varios usamos [] en caso contrario los omitimos
router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospitales
);

router.put('/:id',
    [
        validarJWT,
        validarCampos
    ],
    actualizarHospital)

router.delete('/:id', validarJWT, borrarHospital);

module.exports = router;
