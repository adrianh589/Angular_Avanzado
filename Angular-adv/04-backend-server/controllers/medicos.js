const {response} = require ('express');
const Medico = require('../models/medico.js');
const Hospital = require('../models/hospital.js');

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

const actualizarMedico = async (req, res = response) => {

    const idMedico = req.params.id;
    const uid = req.uid;

    try{

        const medico = await Medico.findById(idMedico);

        if(!medico){
            return res.status(404).json ({
                ok: false,
                msg: 'No existe un medico o un hospital con ese id'
            });
        }

        const medicoActualizado = {
            ...req.body,
            usuario: uid
        }

        const medicoRes= await Medico.findByIdAndUpdate(idMedico, medicoActualizado, {new: true});

        res.json ({
            ok: true,
            medico: medicoRes
        });

    }catch (error){
        console.log(error);
        res.json ({
            ok: false,
            msg: 'Ha surgido un error en el servidor, hable con el administrador'
        });
    }

}

const borrarMedico = async (req, res = response) => {

    const {id} = req.params;

    try{

        const medico = await Medico.findById(id);
        console.log (medico);

        if(!medico){
            res.status(404).json ({
                ok: false,
                msg: 'No existe el medico con ese id'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json ({
            ok: true,
            msg: `Medico ${medico.nombre} borrado exitosamente`
        });

    }catch (error) {

        console.log (error);
        res.status(500).json ({
            ok: false,
            msg: 'Surgio un problema en el servidor, hable con el administrador'
        });

    }

}

module.exports = {
    actualizarMedico,
    borrarMedico,
    crearMedico,
    leerMedico
}
