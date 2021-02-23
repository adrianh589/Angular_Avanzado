const {response} = require ('express');
const Hospital = require ('../models/hospital');

const crearHospitales = async (req, res = response) => {

    const uid = req.uid;

    hospital = new Hospital ({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save ();

        res.json ({
            ok: true,
            hospital: hospitalDB
        });
    } catch (e) {
        res.status (500).json ({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const getHospitales = async (req, res = response) => {

    // El populate me trae ese objeto, y como segundo argumento lo que quiero de ese usuario
    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre email')

    res.json ({
        ok: true,
        hospitales
    });

}

const actualizarHospital = (req, res = response) => {
    res.json ({
        ok: true,
        msg: 'actualizar hospitales'
    });
}

const borrarHospital = (req, res = response) => {
    res.json ({
        ok: true,
        msg: 'borrar hospitales'
    });
}

module.exports = {
    getHospitales,
    actualizarHospital,
    borrarHospital,
    crearHospitales
}
