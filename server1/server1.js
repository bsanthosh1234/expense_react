const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(cors());
// const { Script } = require("vm");
// const { dirname } = require("path");

app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + "/client"));

const conn = require("./connections")
const expense = require("./schema")
const transaction = require("./schema2")




app.post("/category", function (req, res) {
  console.log(req.body)

  const newData = new expense({


    type: req.body.type,
    color: req.body.color
  });


  newData.save()


});
app.get("/category", async (req, res) => {

  let data2 = await expense.find({});

  let filter = await data2.map(v => Object.assign({}, { type: v.type, color: v.color }))
  res.send(filter);

})


app.post("/transaction", function (req, res) {
  console.log(req.body)
  if(req.body.type === "savings")
  {
   console.log(req.body.type) 
    const newData = new transaction({
      date:req.body.date,
      name: req.body.name,
      type: req.body.type,
      amount: req.body.amount,
      // date: new Date(),
      color:"#f9c74f"
    });
    newData.save()
  
  }
  else{
    console.log(req.body.type) 
    const newData = new transaction({
      date:req.body.date,
      name: req.body.name,
      type: req.body.type,
      amount: req.body.amount,
      // date: new Date(),
      color:"#9d4edd"
    });
    newData.save()
  
  }

 

  


});
app.get("/transaction", async (req, res) => {

  let data2 = await transaction.find({});



  //let filter = await data2.map(v => Object.assign({}, { type: v.type, color: v.color }))
  res.send(data2);

})

app.delete("/deltransaction", async (req, res) => {
  console.log(req.body)
  if (!req.body) return res.json({ message: "Request body not found" })
  await transaction.deleteOne(req.body)
})

// app.get("/labels", async (req, res) => {
//   transaction.aggregate([
//     {
//       $lookup: {
//         from: "expense",
//         localField: 'type',
//         foreignField: 'type',
//         as: "categories_info"
//       }
//     },
//     {
//       $unwind: "$categories_info"
//     }
//   ]).then(result => {
//     console.log("result",result)
//     let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color'] }))
//     console.log(data)
//     res.json(data)
//   }).catch(error => {
//     res.status(400).json("Loop  collection error")
//   })
// })






app.listen(8600);

