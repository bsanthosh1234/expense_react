const mongoose = require("mongoose")

mongoose.set("strictQuery", false)
mongoose.connect("mongodb://127.0.0.1:27017/Exp",{
    useNewUrlParser : true,
})
const conn =mongoose.connection;
conn.on("connected", ()=>{
    console.log("Connected");
})
module.exports = conn;