const jwt = require("jsonwebtoken");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");


module.exports.addToCart = async function (req, res) {
    const cart_prod_id = req.params.id
    let data = await Product.findById(cart_prod_id)
    console.log(data)
    try {
        let result = await Cart.create({
            email: req.token.email,
            title: data.title,
            price: data.price,
            description: data.description,
            category: data.category,
            quantity: 1,
            image: data.image
        })
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
    return;
}


module.exports.showCart = async function (req, res) {
    let result = await Cart.find({ email: req.token.email })
    res.send(result)
}

module.exports.incrementQuantity = async function (req, res) {
    const inc_prod_id = req.params.id
    try {
        let result = await Cart.updateOne({ _id: inc_prod_id }, { $inc: { quantity: 1 } })
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
    return;
}

module.exports.decrementQuantity = async function (req, res) {
    const inc_prod_id = req.params.id
    try {
        let result = await Cart.updateOne({ _id: inc_prod_id }, { $inc: { quantity: -1 } })
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
    return;
}

module.exports.deleteFromCart = async function (req, res) {
    const del_cart_id = req.params.id
    return Cart.findByIdAndDelete(del_cart_id).then((result) => res.send(`item deleted`)).catch((err) => console.log("error while deleting"))
}


module.exports.authorize = async function (req, res, next) {
    try {
        let reqtoken = req.headers['authorization']
        const token = reqtoken.replace('Bearer ', '')
        const result = jwt.verify(token, 'sample-test')
        req.token = result
        console.log(req.token.email)
        next()
    }
    catch (err) {
        res.send("error in authorization")
    }
}
