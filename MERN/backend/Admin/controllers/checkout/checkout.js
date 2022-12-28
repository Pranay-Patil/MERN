const jwt = require("jsonwebtoken");
const Sales = require("../../models/Sales");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// ----The checkout function will do these tasks:----
//1.  copy all the data from the cart in sales Model
//2.  make the cart empty
//3.  decrease the product quantity from the product

module.exports.checkout = async function (req, res) {
    let data = await Cart.find({ email: req.token.email })
    data.map(async (item) => {
        try {
            let result = await Sales.create({
                email: item.email,
                title: item.title,
                price: item.price,
                description: item.description,
                category: item.category,
                quantity: item.quantity,
                date: new Date().toLocaleString()
            })
        }
        catch (err) {
            console.log(err)
        }
        console.log(item.quantity)
        let tem = await Product.updateOne({ title: item.title }, { $inc: { quantity: -(item.quantity) } })
    })
    let temp = await Cart.deleteMany({ email: req.token.email });

    res.send("checkout work done")
}

module.exports.showSalesReport = function (req, res) {
    return Sales.find().then((result) => res.send(result)).catch((err) => res.send("some error occurd"))
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

