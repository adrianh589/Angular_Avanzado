/*
    Path: /api/login
 */

const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { Router } = require('express');
const { login, GoogleSignIn } = require('../controllers/auth');


const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google',
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    GoogleSignIn
);

module.exports = router
