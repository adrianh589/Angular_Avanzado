const {Schema, model} = require('mongoose');

let MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    // Si necesitamos la relacion uno a muchos, ponemos los [] corchetes
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

// Debido a que el id en la respuesta sale como _id, se procede a quitar ese guion bajo para
// traerlo como 'id'
MedicoSchema.method('toJSON', function (){
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model( 'Medico', MedicoSchema );
