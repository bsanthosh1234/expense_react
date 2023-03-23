const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const tran = new Schema({


    "date":String,
    "name":String,
    "type":String,
    "amount":Number,
    // "date":{type:Date,default:Date.now},
    "color":String
    
}, { collection: "tran", timestamps: true })

const transaction= new mongoose.model("tran",tran)
module.exports =transaction