'use strict';

const mongoose = require('mongoose');

//definir un anuncio
const followersSchema = mongoose.Schema({
    follow_by: String ,
    follow_of:String,
    
});

followersSchema.statics.lista = function (filtro,skip,limit){
  const consultaBD = followers.find(filtro)
  consultaBD.skip(skip);
  consultaBD.limit(limit);
  return consultaBD.exec()
}


// crear el modelo
const followers = mongoose.model('followers', followersSchema);

// exportar el modelo
module.exports = followers;