'use strict';
const express = require('express')

const { query } = require('express')
const Publicaciones = require('../models/Publicaciones')
const { resolveInclude } = require('ejs')
const router = express.Router()
//manejo los metodos CRUD


//GET POST
router.get('/',async (req,res,next)=>{
    try{const filtro = {}
        filtro.fecha = req.query.fecha;
        filtro.usuario = req.query.usuario;
        filtro.texto = req.query.texto;
        filtro.imagen = req.query.imagen;
        filtro.id = req.query.id;
        const skip = req.query.skip
        const limit = req.query.limit
        if (filtro.fecha || filtro.imagen || filtro.texto || filtro.usuario||filtro.id){
            const lista = await (Publicaciones.lista({$or:[{_id:filtro.id},{usuario:filtro.usuario},{texto:filtro.texto},{fecha:filtro.fecha},{imagen:filtro.imagen}],skip,limit}))
            res.send({lista})
        }
        else {
            const listado = await (Publicaciones.lista({},skip,limit))
            res.send({listado}) }  
    

        


    }catch(error){
        next(error)
    }})
    
//CREAR UN NUEVO POST
router.post('/', async (req, res, next) => {
    try {
        //precojo los datos de query
        const new_post = {};
        new_post.fecha = new Date();
        new_post.usuario = req.query.usuario;
        new_post.texto = req.query.texto;
        new_post.imagen = req.query.imagen;
      

        
    
        // instanciar un nueva publicacion en memoria
        const Pub = new Publicaciones(new_post);
        //guardar publicacion en BD
        const save_post = Pub.save();
    
        res.json({ result:Pub._id,usuario:Pub.usuario});
    
    } catch (err) {
        next(err);
    }
    });

// Eliminar un post
router.delete('/', async (req, res, next) => {
try {

    const id = req.query.id;

    const post = await Publicaciones.findById(id);

    if (!post) {
    // const err = new Error('not found');
    // err.status = 404;
    return next(createError(404));
    }

    await Publicaciones.deleteOne({ _id: id });

    res.json();

} catch (err) {
    next(err);
}
});

//Actualizar un post
// PUT /api/agentes/(id) (body=agenteData) esto no lo hice as'i pq lo hice con 
router.put('/', async (req, res, next) => {
try {
    const postToUpdate =  {}
    postToUpdate.id = req.query.id;
    postToUpdate.usuario = req.query.usuario;
    postToUpdate.texto = req.query.texto;
    postToUpdate.imagen = req.query.imagen;
    

    const post = await Publicaciones.findById(postToUpdate.id);
    postToUpdate.fecha = post.fecha; // al hacer update de un post, la fecha no debe cambiar
    const postUpdated = await Publicaciones.updateOne( { _id: post.id},postToUpdate, {
    new: true // esto hace que nos devuelva el documento actualizado
        });


    res.json({ result:postUpdated });

} catch (err) {
    next(err);
}
});







module.exports = router;

