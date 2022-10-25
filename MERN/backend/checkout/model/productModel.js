const mongoose = require("mongoose")
const schema = mongoose.Schema

const productSchema = new schema({
    title:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    category:{
        type: String
    },
    quantity:{
        type:Number
    }
})

const productModel = mongoose.model("productdata", productSchema)

module.exports= productModel
