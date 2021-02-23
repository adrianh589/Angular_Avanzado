const {response} = require ('express');
const Medico = require('../models/medico.js');

const crearMedico = async (req, res = response) => {

    try{
        const uid = req.uid;

        medico = new Medico({
            usuario: uid,
            ...req.body
        });

        const medicoDB = await medico.save();

        res.json ({
            ok: true,
            medico: medicoDB
        });
    }catch (e) {
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error, hable con el administrador"
        })
    }


}

const leerMedico = async (req, res = response) => {

    const medicos = await Medico.find()
        .populate('hospital', 'nombre img')
        .populate('usuario', 'nombre img');

    res.json ({
        ok: true,
        medicos
    });
}

const actualizarMedico = (req, res = response) => {
    res.json ({
        ok: true,
        msg: 'actualizar medico'
    });
}

const borrarMedico = (req, res = response) => {
    res.json ({
        ok: true,
        msg: 'borrar medico'
    });
}

module.exports = {
    actualizarMedico,
    borrarMedico,
    crearMedico,
    leerMedico
}
