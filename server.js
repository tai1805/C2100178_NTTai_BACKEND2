const app = require("./app");
const config = require ("./app/config");
const MongoDB = require ("./app/utils/mongodb.util");

async function startServer(){
    try{
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database!");
        
        const PORT = config.app.port;
        app.listen(PORT,()=>{
            console.log(`Sever is running on port ${PORT}.`);
        });
        
    }catch (error){
        console.log("Cannot Connected to the database!", error);
        process.exit();
    }
}

startServer();

