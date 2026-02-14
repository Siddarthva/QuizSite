const mongoose=require('mongoose');
const dbgr=require('debug');

mongoose.connect(`${process.env.CONNECTION_URL}/quizzgame`).then((res)=>{
    console.log("Mongo connected sucessfully");
    dbgr("connected");
}).catch((err)=>{
    dbgr(err);
})

module.exports=mongoose.connection;