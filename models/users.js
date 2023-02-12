'use strict';

const mongoose = require('mongoose');

/**
 * Crea el schema con los campos.
 */
const usersSchema = mongoose.Schema({
    name: String,
    alias: String,
    password: String 
});

/**
 * Devuelve el contenido de la tabla Honors
 * @param {} filtro 
 * @param {*} skip 
 * @param {*} limit 
 * @returns 
 */
usersSchema.statics.lista = function (filtro, skip, limit) {
  const consultaBD = Users.find(filtro);
  consultaBD.skip(skip);
  consultaBD.limit(limit);
  return consultaBD.exec()
}

const Users = mongoose.model('Users', usersSchema);

module.exports = { Users };