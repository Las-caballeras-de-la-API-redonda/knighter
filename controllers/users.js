const Users = require("../models/users").Users

async function list(req, res, next) {
    try {
        const skip = req.query.skip
        const limit = req.query.limit
        let listado;
        if (req.query.id){
            listado = await (Users.lista({_id: req.query.id}));
        } else if (req.query.username && req.query.password) {
            listado = await (Users.lista({$and:[{username:req.query.username},{alias:req.query.password}]},skip,limit));           
        } else {
            listado = await (Users.lista({},skip,limit));           
        }   
        res.json({listado});
    } catch(error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        let listado;
        if (req.body.username && req.body.password) {
            res.json(await (Users.lista({username:req.body.username, password:req.body.password})));           
        } else {
            res.json({});
        }   
    } catch(error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const new_post = {
            name:  req.body.name,
            surname:  req.body.surname,
            password:  req.body.password,
            username: req.body.username,
            email: req.body.email
        };
        const newRegister = new Users(new_post);        
        newRegister.save();
        res.json({ result: newRegister});
    } catch (err) {
        next(err);
    }
}

async function update(req, res) {
    const edit_post = {
        name:  req.body.name,
        surname:  req.body.surname,
        password:  req.body.password,
        username: req.body.username,
        email: req.body.email
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

module.exports = { list, create, update, delRegister, login };
