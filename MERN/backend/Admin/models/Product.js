const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    requied: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image:{
    type:String
  }

});

const Product = mongoose.model("productdata", productSchema);

module.exports = Product;
