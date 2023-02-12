'use strict';

const mongoose = require('mongoose');

/**
 * Crea el schema con los campos.
 */
const honorsSchema = mongoose.Schema({
    publishing_id: String,
    user: String 
});

/**
 * Devuelve el contenido de la tabla Honors
 * @param {} filtro 
 * @param {*} skip 
 * @param {*} limit 
 * @returns 
 */
honorsSchema.statics.lista = function (filtro, skip, limit) {
  const consultaBD = Honors.find(filtro);
  consultaBD.skip(skip);
  consultaBD.limit(limit);
  return consultaBD.exec()
}

const Honors = mongoose.model('Honors', honorsSchema);

module.exports = { Honors };