const ContactService = require("../../services/contact.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.create = (req,   res)    =>{
    res.send({message:"create handler"});
};
exports.findAll = (req,  res)    =>{
    res.send({message:  "findAll handler"});
};
exports.findOne = (req,  res)    =>{
    res.send({message:  "findOne handler"});
};
exports.update = (req,  res)    =>{
    res.send({message:  "findAll handler"});
};
exports.delete = (req,  res)    =>{
    res.send({message:  "findAll handler"});
};
exports.deleteAll = (req,  res)    =>{
    res.send({message:  "findAll handler"});
};
exports.findAllFavorite = (req,  res)    =>{
    res.send({message:  "findAll handler"});
};
// Create and Save a new Contact
exports.create = async( req, res, next)=>{
    if (!req.body?.name){

        return next(new ApiError(400, "Name can not be empty"));
    }
    try{
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.create(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, " An error occurred while creating the contact")
        );
    }
};
// Retrive all contacts of a user from the database
exports.findAll = async( req, res, next)=>{
    let document = [];
     try{
        const contactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name){
            document = await contactService.findByName(name);
        }else{
            document = await contactService.find({});

        }

     }
     catch (error){
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
     }
     return res.send(document);
};
 class contactservice {
    async find(filter) {
        const cursor = await this.contact.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: {$regex: new RegExp(name),    $options: "i"},
        });

    }
 }
 //Find a single contact with an id
 exports.findOne = async( req, res, next)=>{

try{
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);
    if  (!document){
        return next(new ApiError(404, "Contact not found"));
    }
return res.send(document);

}
catch(error){
    return next(
        new ApiError (500,  `Error retrieving contact with id =${req.params.id}`)
    )
}

 };
 class contactservice{
    async findById(id){
return await this.contact.findOne({
    _id:ObjectID.isvalid(id) ? new ObjectID(id) : null,
});

    }
 }
 //Update a contact by the id in the request
 exports.update = async (req, res, next)=>{
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,   "Data to update con not be empty"));
    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message:   "Contact was update successfully"});
    
    }
    catch(error){
        return next(
            new ApiError(500, `Error updating contact with id =${req.params.id}`)
        );
    }

 };
 class contactService{
    async update (id , payload){
        const filter = {
            _id: ObjectId.isvalid(id) ? new    ObjectId(id): null,

        };
        const update = this.extractConactData(payload);
        const result = await this.contact.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument: "after"}
        );
        return result.value;
    } 
 }
 //Delete a contact with specified id in the request
exports.delete = async( req, res, next)=>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,    "Contact not found"));
}
return res.send({message:     "Contact was deleted successfully"});

    }
    catch(error){
        return next(
            new ApiError(
                500, `Could not delete contact with id=${req.params.id}`
            )
        );
    }

 };

 class ContactService{
    async delete(id){
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isvalid(id) ? new ObjectId(id): null,
        });
        return result.value;
    }
 }
 //find all favorite contacts of a user
 exports.findAllFavorite = async(_req, res, next)=>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findAllFavorite();
        return res.send(document);

    }
    catch(error){
        return next(
            new ApiError(
                500,    "An error occurred while retrieving favorite contacts"
            )
        );
    }

 };
 class ContactService{
    async findAllFavorite(){
        return await this.find({ favortie: true });
    }
 }
 //Delete all contact of a user from the database
 exports.deleteAll = async(_req, res, next)=>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({message: `${deleteCount} contacts were deleted successfully`,

    });

 }
 catch{
return next( new ApiError (500, "An error occurred while removing all contacts"));
 }


};
class ContactService {
    async deleteAll(){
        const result = await this.Contact.deleteMany({});
        return result.deleteCount;
    }
}