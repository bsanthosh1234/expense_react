const model = require('../modals/model')

//post:http://localhost:5050/categories
async function create_Categories(req, res) {
    const Create = new model.categories(
        {
            type: "savings",
            color: "#f9c74f"

        }
    )
    try {
        await Create.save()
        res.status(200).json({ message: 'Expense Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}


//get :http://localhost:5050/categories

async function get_categories(req, res) {
    // let data= await model.categories.find({})
    // console.log(data)

    // return res.json(data)

    let data = await model.categories.find({})
    let filter = await data.map(v => Object.assign({}, { type: v.type, color: v.color }))


    return res.json(filter)
}

//post:http://localhost:5050/transaction
async function create_Transaction(req, res) {
    console.log(req.body)

    if (!req.body) return res.status(400).json("post http data not provided")
    let { user,date, name, type, amount } = req.body
    const Create = await new model.transaction(
        {
            user,
            date,
            name,
            type,
            amount
        }
    )
    try {
        await Create.save()
        res.status(200).json({ message: 'transaction  Added' })
    } catch (error) {
        res.status(500).json({ message: 'error while adding transaction' })
    }
}


async function get_Transaction(req, res) {
    // let data= await model.categories.find({})
    // console.log(data)

    // return res.json(data)

    let data = await model.transaction.find({})
    //let filter=await data.map(v=>Object.assign({},{type:v.type,}))


    return res.json(data)
}




async function delete_Transaction(req, res) {
    if (!req.body) return res.json({ message: "Request body not found" })
    await model.transaction.deleteOne(req.body)
    res.send("delted sucessfully")
}

async function del(req, res) {
    //console.log("deleted id: ",req.body.id);
    await model.transaction.findByIdAndDelete(req.body.id);
    //await model.transaction.deleteOne(req.body.id)
    res.send("delted sucessfully")

}


async function addCsv(req, res) {
    console.log("csv ", req.body)

    const newData = req.body;
    let temp = []
    //  for(var i in newData)

    //  {
    //     // console.log(i,newData[i])
    //     const Create = await new model.transaction(newData[i])
    //     try {
    //         let data = await Create.save()
    //         temp.push(data)
    //     } catch (error) {
    //         console.log(error)
    //         //res.status(500).json({ message: 'error while adding transaction' })
    //     }
    //  }
    res.send(newData)
}

//get:http://localhost:5060/labels

async function get_Labels(req, res) {
    model.transaction.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: 'type',
                foreignField: 'type',
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, { _id: v._id, date: v.date, name: v.name, type: v.type, amount: v.amount,user:v.user, color: v.categories_info['color'] }))
        //console.log(data)
        res.json(data)
    }).catch(error => {
        res.status(400).json("Loop  collection error")
    })
}


module.exports = {
    create_Categories,
    get_categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels,
    del,
    addCsv
}
