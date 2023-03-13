const mongoose=require('mongoose')

mongoose.set("strictQuery",false)
mongoose.connect("mongodb://127.0.0.1:27017/Expense_track",{
    useNewUrlParser :true,
})

const conn=mongoose.connection;


conn.on("connected", ()=>{
    console.log("database Connected sucessfully");
   

})
conn.on("disconnected", ()=>{
    console.log("database disConnected sucessfully");
    
})
module.exports = conn;


