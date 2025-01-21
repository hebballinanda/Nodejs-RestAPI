const express = require('express');
require('dotenv').config();
const feedRoutes = require('./routes/feed');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','content-type,Authorization');
    next();
})

app.use('/feeds',feedRoutes);

app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({message:error.message})
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(result=>{
        console.log("Mongoose Connected");
        app.listen(process.env.PORT,()=>{
            console.log("Server is running in Port :"+process.env.PORT)
        });
    })
    .catch(err=>{
        console.log("Some error occured while connecting to Mongoose!");
    })
