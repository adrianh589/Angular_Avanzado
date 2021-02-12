/*
    Path: /api/login
 */

const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { Router } = require('express');
const { login } = require('../controllers/auth');


const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

module.exports = router
