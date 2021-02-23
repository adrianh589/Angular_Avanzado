const fs = require ('fs');
const Usuario = require ('../models/usuario');
const Medico = require ('../models/medico');
const Hospital = require ('../models/hospital');

const borrarImagen = path => {
    if (fs.existsSync (path)) {
        // Borrar la imagen anterior
        fs.unlinkSync (path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    const modelo = await validarModelo(tipo, id);
    const pathViejo = `./uploads/${tipo}/${modelo.img}`;
    borrarImagen (pathViejo);
    modelo.img = nombreArchivo;
    await modelo.save();
    return true;
}

const validarModelo = async (tipo, id) =>{
    const resultado = (tipo==='usuarios') ? Usuario : (tipo==='medicos') ? Medico : (tipo==='hospitales') ? Hospital : null;
    const modelo = await resultado.findById (id);
    return (modelo) ? modelo : false;
}

module.exports = {
    actualizarImagen,
    validarModelo
}
