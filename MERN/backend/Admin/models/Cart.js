const mongoose = require("mongoose");

const schema = mongoose.Schema;

const cartSchema = new schema({
    email: {
        type: String
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    quantity: {
        type: Number
    },
    image: {
        type: String
    }
});

const Cart = mongoose.model("cartdata", cartSchema)

module.exports = Cart;
