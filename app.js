const express = require("express");
const cors =require("cors");
const app =express();
app.use(cors());
app.use(express.json());
app.get("/",(req, res)=>{
    res.json({ message:"Welcome to contact book application."});
});

app.use((req,res,next)=>{
    return next (new ApiError(404,"Resource not found"));
});
app.use((err,req,res,next)=>{
    return res.status(Error.statusCode || 500).json({
        message: Error.message || "Internal Server Error",
    });
});



module.exports =app;