const {response} = require ('express');
const path = require('path');
const fs = require('fs');
const {v4: uuidv4} = require ('uuid');
const {actualizarImagen, validarModelo} = require ('../helpers/actualizar-imagen');
const { respuestaJSON } = require('../helpers/respuesta-json');

const cargarArchivo = async (req, res = response) => {

    const {tipo, id} = req.params;

    // validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes (tipo)) {
        const prueba = 48;
        return respuestaJSON(res, false, `El tipo --${tipo}-- no es valido`, 400, prueba);
    }

    // Validar que exista el modelo a modificar con el id
    if( !await validarModelo (tipo, id) ){
        return respuestaJSON(res, false,`El modelo ${tipo} no coincide con el id`, 400);
    }

    // Para atrapar el archivo en postman nos dirijimos a Body -> form-data -> File
    // Descargaremos express-fileupload
    // Validar de que exista un archivo
    if (!req.files || Object.keys (req.files).length === 0) {
        return respuestaJSON(res, false, 'No ha subido ningun archivo', 400);
    }

    // Procesar la imagen...
    const file = req.files.imagen;

    const nombreCortado = file.name.split ('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes (extensionArchivo)) {
        return respuestaJSON(res, false, 'No es una extension permitida', 400);
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4 ()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    await file.mv (path, (error) => {
        if (error) {
            console.log (error);
            return respuestaJSON(res, false, 'Error al mover la imagen', 500);
        }
        //Actualizar base de datos
        actualizarImagen (tipo, id, nombreArchivo);

        respuestaJSON(res, true, 'Archivo subido correctamente', 200, nombreArchivo, res);
    });
}

const retornaImagen = (req, res) => {
    const { tipo } = req.params;
    const { foto } = req.params;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);

    //Imagen por defecto en caso de que no haya imagen
    if ( fs.existsSync(pathImg) ){
        // Enviar el archivo mas no el json
        res.sendFile( pathImg );
    }else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    cargarArchivo,
    respuestaJSON,
    retornaImagen
}
