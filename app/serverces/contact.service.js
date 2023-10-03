const {ObjectId}  = require ("mongodb");
class contactService{
    constructor(client){
        this.contact = client.db().collection("contacts");
    }
    extractConactData(payload){
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        Objects.keys(Contact).forEach(
            (key) => contact[key] === undefined &&  delete contact[key]
        );
        return contact;
    }
    async create(payload){
        const contact = this.extractConactData(payload);
        const result = await this.Contact.findoneAndUpdate(
            contact,
            {$set: { favorite: contact.favorite===true}},
            {returnDocument: "after", upsert:true}
        );
        return result.value;
    }

}
module.exports = contactService;