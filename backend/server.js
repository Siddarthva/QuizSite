require("dotenv").config();
const cookieParser = require('cookie-parser');
const express=require('express');
const cors = require("cors");
const app=express();
require('./dataabase/db')
const {path} =require('path')
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

const UserRoute=require('./route/UserRoute')

app.use("/user",UserRoute);


const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`${PORT}`);
});