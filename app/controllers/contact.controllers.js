const ApiError = require("./app/api-error");
const contactService = require("./app/services/contact.service");
const mongodb = require("./app/utils/mongodb.util");
exports.create = (req, res)=>{
    res.send({ message:"create handler"});
}

//Create and save a new Contact
exports.Create = async (req, res, next)=>{
    if(!req.body?.name){
        return next(new APIError(400, "Name can not be empty"));
    }
    try{
        const contactService = new contactService(mongodb.client);
        const document = await contactService.create(req.body);
        return res.send(document);

    }catch (error){
        return next(new APIError(500, "An error occured while creatimg the contact"));

    }
};

exports.findAll = (req, res)=>{
    res.send({ message: "findAll handler"});
}

exports.findOne = (req, res)=>{
    res.send({ message:"fiandOne handler"});
}

exports.update = (req, res)=>{
    res.send({ message:"update handler"});
}

exports.delete = (req, res)=>{
    res.send({ message:"delete handler"});
}

exports.deleteAll = (req, res)=>{
    res.send({ message:"deleteAll handler"});
}

exports.findAllFavorite = (req, res)=>{
    res.send({ message:"findAllFavorite handler"});
}