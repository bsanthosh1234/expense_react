const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const exp = new Schema({
    
    "type": String,
    "color":String
}, { collection: "exp", timestamps: true })

const expense= new mongoose.model("exp",exp)
module.exports =expense