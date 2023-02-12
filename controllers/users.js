const Users = require("../models/users").Users

async function list(req, res, next) {
    try {
        const filtro = {
            name: req.query.name,
            alias: req.query.alias,
            id: req.query.id
        }
        const skip = req.query.skip
        const limit = req.query.limit
        let listado;
        if (filtro.id){
            listado = await (Users.lista({_id:filtro.id}));
        } else {
            listado = await (Users.lista({$or:[{name:filtro.name},{alias:filtro.alias}]},skip,limit));           
        }   
        res.json({listado});
    } catch(error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const new_post = {
            name: req.query.name,
            alias: req.query.alias,
            password: req.query.password
        };
        const new_honor = new Users(new_post);        
        new_honor.save();
        res.json({ result: new_honor});
    } catch (err) {
        next(err);
    }
}

async function update(req, res) {
    const edit_post = {
        id: req.query.id,
        name: req.query.name,
        alias: req.query.alias,
        password: req.query.password
    };
    const current_register = await Users.findById(edit_post.id);
    const postUpdated = await Users.updateOne( { _id: current_register.id}, 
                                                edit_post,
                                                { new: true } );
    res.json({ result:edit_post });
}

async function delRegister(req, res, next) {
    try {
        const id = req.query.id;   
        const post = await Users.findById(id);
        if (!post) {        
            res.status(404).json();
        }    
        await Users.deleteOne({ _id: id });    
        res.json({ _id: id });
    } catch (err) {
        next(err);
    }
}

module.exports = { list, create, update, delRegister };