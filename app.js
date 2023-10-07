const express = require('express');
const cors = require('cors');
const contactRouter = require('./app/routes/contact.route');
const ApiError = require('./app/api_error');

const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "welcome to contact book application"});
});

app.use('/api/contacts', contactRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource Not Found'));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error',
    });
});

module.exports = app;