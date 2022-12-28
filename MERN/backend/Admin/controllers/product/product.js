let Product = require("../../models/Product");
let User = require("../../models/User")
const jwt = require('jsonwebtoken')


module.exports.addProduct = async function (req, res) {
    const data = req.body;
    console.log(data);
    try {
        let result = await Product.create({
            title: data.title,
            price: data.price,
            description: data.description,
            category: data.category,
            quantity: data.quantity,
            image: data.image
        });
        res.send("Product added");
    } catch (err) {
        res.send("Error generate", err);
    }
};

module.exports.viewProduct = function (req, res) {
    return Product
        .find()
        .then((result) => res.send(result))
        .catch((err) => res.send("some error occurd"));
};
module.exports.viewSingleProduct = async function (req, res) {
    const productId = req.params.id
    let result = await Product.find({ _id: productId })
    console.log(result);
    res.send(result)

};

module.exports.deleteProduct = function (req, res) {
    const delid = req.params.id;
    return Product
        .findByIdAndDelete(delid)
        .then((result) => res.send(`item deleted with ID : ${delid}`))
        .catch((err) => console.log("error while deleting"));
};

module.exports.updateProduct = async function (req, res) {
    const updateid = req.params.id;
    await Product
        .findByIdAndUpdate(updateid, req.body)
    res.send('updated product')
};

//checkout will decrement the product quantity by 1

module.exports.checkoutProduct = async function (req, res) {
    const checkoutProductid = req.params.id;
    try {
        let result = await Product.updateOne(
            { _id: checkoutProductid },
            { $inc: { quantity: -1 } }
        );
        res.send(result);
    } catch (err) {
        res.send(err);
    }
    return;
};


module.exports.addToWishlist = async function (req, res) {
    const wishlist_prod_id = req.params.id
    let result = await Product.findById(wishlist_prod_id)
    return User.updateOne({ email: req.token.email }, { $push: { wish_list: result } }).then((data) => res.send("done"))
}


module.exports.deleteFromWishlist = async function (req, res) {
    return User.updateOne({ email: req.token.email }, { $pop: { wish_list: 1 } }).then((data) => res.send("deletion done"))
}

module.exports.showWishlist = async function (req, res) {
    let result = await User.findOne({ email: req.token.email })

    res.send(result.wish_list)
}

module.exports.authorize = async function (req, res, next) {
    try {
        let reqtoken = req.headers['authorization']
        const token = reqtoken.replace('Bearer ', '')
        const result = jwt.verify(token, 'sample-test')
        req.token = result
        // console.log(req.token,'req token')
        next()
    }
    catch (err) {
        console.log('err');
        res.send("error in authorization")
    }
}

module.exports.seachItems = async function (req, res) {
    const cateGory = req.params.category;
    let products = JSON.parse(req.body.product_list);
    let categoryList = products.filter((item) => item.category === cateGory);

    res.send(categoryList);
};
module.exports.sortLowertoHigher = async function (req, res) {
    let products = JSON.parse(req.body.product_list);
    products.sort((a, b) => {
        return a.price - b.price;
    });
    res.send(products);
};

module.exports.sortHighertoLow = async function (req, res) {
    let products = JSON.parse(req.body.product_list);
    products.sort((a, b) => {
        return b.price - a.price;
    });
    res.send(products);
};

