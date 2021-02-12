const {Schema, model} = require('mongoose');

let UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: "USER_ROLE"
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Debido a que el id en la respuesta sale como _id, se procede a quitar ese guion bajo para
// traerlo como 'id'
UsuarioSchema.method('toJSON', function (){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model( 'Usuario', UsuarioSchema );
