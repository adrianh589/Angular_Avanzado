const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbconnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbconnection();

// Se instalo nodemon con la finalidad de que al realizar cambios este se refresque automaticamente
// En el package.json se modifico el script para iniciar express

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: '+ process.env.PORT);
});
