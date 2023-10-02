const config ={
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGGODB_URI || "mongodb://127.0.1:27017/contactbook"
    }
};

module.exports = config;