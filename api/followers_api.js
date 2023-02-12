'use strict'
const express = require('express')

const { query } = require('express')
const Followers = require('../models/Followers')
const router = express.Router()
//manejo los metodos CRUD
//listado de seguidores de un usuario
router.get('/listadodeseguidores',async (req,res,next)=>{
    try{const usuario = req.query.usuario
        const skip = req.query.skip
        const limit = req.query.limit
        const listado_de_seguidores = []
        const listado = await (Followers.lista({follow_of:usuario},skip,limit))
        for (let i = 0; i < listado.length; i++){
            listado_de_seguidores.push(listado[i].follow_by)

        }res.json({listado_de_seguidores})
    }catch(error){
        next(error)
    }})

    //listado de seguidos por un usuario
router.get('/listadodeseguidos',async (req,res,next)=>{
    try{const usuario = req.query.usuario
        const skip = req.query.skip
        const limit = req.query.limit
        const listado_de_seguidos = []
        const listado = await (Followers.lista({follow_by:usuario},skip,limit))
        for (let i = 0; i < listado.length; i++){
            listado_de_seguidos.push(listado[i].follow_of)

        }res.json({listado_de_seguidos})
    }catch(error){
        next(error)
    }})
    //eliminar seguidor/dejar de seguir
router.delete('/eliminarseguidor', async (req, res, next) => {
    try {const user_to_delete = req.query.UsertoDelete
        const usuario = req.query.usuario
        await Followers.findOneAndDelete({$and:[{follow_of:usuario},{follow_by:user_to_delete}]}); // obtengo lista de seguidores del usuario;
        res.json();
    
    } catch (err) {
        next(err);
    }
    });
    //empezar a seguir post
    router.post('/empezaraseguir', async (req, res, next) => {
        const Follower = {}
        try {
            Follower.follow_by = req.query.usuario
            Follower.follow_of = req.query.user_to_follow
            const Insert_Follower = new Followers(Follower);
            //guardar publicacion en BD
            const save_post = Insert_Follower.save();
        
            res.json({ result:Insert_Follower});
        } catch (err) {
            next(err);
        }
        });

    
    





module.exports = router;

