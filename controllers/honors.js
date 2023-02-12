const Honors = require("../models/honors").Honors;

async function list(req, res, next) {
    try {
        const filtro = {
            publishing_id: req.query.publishing_id,
            user: req.query.user,
            id: req.query.id
        }
        const skip = req.query.skip;
        const limit = req.query.limit;
        let listado;
        if (filtro.id){
            listado = await (Honors.lista({_id:filtro.id}));
        } else {
            listado = await (Honors.lista({$or:[{publishing_id:filtro.publishing_id}, {user:filtro.user}]},skip,limit));           
        }   
        res.json({listado});
    } catch(error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const new_post = {
            publishing_id: req.query.publishing_id,
            user: req.query.user
        };
        const new_honor = new Honors(new_post);        
        new_honor.save();
        res.json({ result: new_post});
    } catch (err) {
        next(err);
    }
}

async function update(req, res) {
    const edit_post = {
        id: req.query.id,
        publishing_id: req.query.publishing_id,
        user: req.query.user
    };
    const current_register = await Honors.findById(edit_post.id);
    const postUpdated = await Honors.updateOne( { _id: current_register.id}, 
                                                edit_post,
                                                { new: true } );
    res.json({ result:edit_post });
}

async function delRegister(req, res, next) {
    try {
        const id = req.query.id;   
        const post = await Honors.findById(id);
        if (!post) {        
            res.status(404).json();
        }    
        await Honors.deleteOne({ _id: id });    
        res.json({ _id: id });
    } catch (err) {
        next(err);
    }
}

module.exports = { list, create, update, delRegister };