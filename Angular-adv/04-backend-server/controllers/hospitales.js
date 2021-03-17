const {response} = require ('express');
const Hospital = require ('../models/hospital');
const { respuestaJSON } = require('../helpers/respuesta-json');

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

const actualizarHospital = async (req, res = response) => {

    const { id } = req.params;
    const uid = req.uid;

    try{

        const hospital = await Hospital.findById(id);

        if(!hospital){
            return respuestaJSON(res, false, 'No hay un hospital con este id', 404);
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, {new: true});

        respuestaJSON(res, true, hospitalActualizado, 200);

    }catch (error){
        console.log (error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const borrarHospital = async (req, res = response) => {

    const { id } = req.params;

    try{

        const hospital = await Hospital.findById(id);

        if(!hospital){
            return respuestaJSON(res, false, 'No hay un hospital con este id', 404);
        }

        const hospitalBorrado = await Hospital.findByIdAndDelete(id);

        respuestaJSON(res, true, 'Hospital Eliminado correctamente!', 200);

    }catch (error){

        console.log(error);
        res.status(500).json ({
            ok: true,
            msg: 'Hubo un error, hable con el administrador...'
        });

    }


}

module.exports = {
    getHospitales,
    actualizarHospital,
    borrarHospital,
    crearHospitales
}
