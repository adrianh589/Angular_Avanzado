const mongoose = require('mongoose');
require('dotenv').config();

const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online, Conectada con exito');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD, ver logs');
    }


}

// Exportamos la funcion, dado que estamos en node se hace de estas manera a diferencia de TS
module.exports = {
    dbconnection
}
