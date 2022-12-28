const mongoose = require("mongoose");

const schema = mongoose.Schema

const salesSchema = new schema({
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
    date: {
        type: String
    }

})

const Sales = mongoose.model("salesdata", salesSchema)

module.exports = Sales;
