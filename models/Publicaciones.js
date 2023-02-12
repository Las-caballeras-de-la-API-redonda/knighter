//'use strict';

const mongoose = require('mongoose');

//definir un anuncio
const publicacionesSchema = mongoose.Schema({
    fecha:  Date,
    usuario: String ,
    texto:String,
    imagen:String,
    
});

publicacionesSchema.statics.lista = function (filtro,skip,limit){
  const consultaBD = Publicaciones.find(filtro).sort({fecha:-1})
  consultaBD.skip(skip);
  consultaBD.limit(limit);
  return consultaBD.exec()
}



// crear el modelo
const Publicaciones = mongoose.model('Publicaciones', publicacionesSchema);

// exportar el modelo
module.exports = Publicaciones;