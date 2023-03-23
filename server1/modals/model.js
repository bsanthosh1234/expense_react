const mongoose=require('mongoose')

const Schema=mongoose.Schema


//categories = ['type','color'] 

const categories_model=new Schema(
    {
        type:{type:String,default:"expense"},
        color:{type:String,default:"#FCBE44"}
    }
)


//transactons => ['name','type','amount']

const transaction_model=new Schema({
    user:String,
    date:String,
    name:{type:String,default:'Anonymous'},
    type:{type:String,default:'expense'},
    amount:{type:Number},
    // date:{type:Date,default:Date.now}
})


const categories=mongoose.model('categories',categories_model)
const transaction= mongoose.model('transaction',transaction_model)


exports.default =transaction


module.exports = {
    categories,transaction
}



