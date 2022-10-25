
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requied: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image:{
    type:String
  }
});




const productModel = mongoose.model("productdatas", productSchema)



module.exports = productModel;


