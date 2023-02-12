'use strict';
//configuro la conexion a mongodb nodepop

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
    console.log('Error de conexión a MongoDB', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
});

mongoose.connect('mongodb://127.0.0.1/tweeter')

module.exports = mongoose.connection;