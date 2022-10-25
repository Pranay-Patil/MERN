const mongoose = require("mongoose")
const schema = mongoose.Schema

const cartSchema = new schema({
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
    }
})

const cartModel = mongoose.model("cartdata", cartSchema)

module.exports= cartModel
