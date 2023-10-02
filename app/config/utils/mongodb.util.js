const{MongodbClient} = require("mongodb");

class MongoDB {
    static connect = async (uri)=>{
        if(this.client) return this.client;
        this.client = await MongodbClient.connect(uri);
        return this.client;
    };
}
module.exports=MongoDB;