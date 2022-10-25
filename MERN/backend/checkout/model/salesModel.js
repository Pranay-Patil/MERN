const mongoose = require("mongoose")
const schema = mongoose.Schema
mongoose.connect("mongodb+srv://abhi_capstone:g3capstone@cluster0.jwbklkz.mongodb.net/?retryWrites=true&w=majority").then((res)=>console.log("connecting to prduct model")).catch((err)=>console.log(err))

const salesSchema = new schema({
    email:{
        type:String
    },
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
    },
    date:{
        type:String
    }

})

const salesModel = mongoose.model("salesdata", salesSchema)

module.exports= salesModel
