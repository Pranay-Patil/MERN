let productModel = require("../model/productmodel");
let UserModel = require("../model/usermodel")
const jwt = require('jsonwebtoken')

Controllers = {};

Controllers.addProduct = async function (req, res) {
  const data = req.body;
  console.log(data);
  try {
    let result = await productModel.create({
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      quantity: data.quantity,
      image:data.image
    });
    res.send("Product added");
  } catch (err) {
    res.send("Error generate", err);
  }
};

Controllers.viewProduct = function (req, res) {
  return productModel
    .find()
    .then((result) => res.send(result))
    .catch((err) => res.send("some error occurd"));
};
Controllers.viewSingleProduct = async function (req, res) {
  const productId = req.params.id
  let result = await productModel.find({_id:productId})
  console.log(result);
  res.send(result)

};

Controllers.deleteProduct = function (req, res) {
  const delid = req.params.id;
  return productModel
    .findByIdAndDelete(delid)
    .then((result) => res.send(`item deleted with ID : ${delid}`))
    .catch((err) => console.log("error while deleting"));
};

Controllers.updateProduct =async function (req, res) {
  const updateid = req.params.id;
  await productModel
    .findByIdAndUpdate(updateid, req.body)
  res.send('updated product')
};

//checkout will decrement the product quantity by 1

Controllers.checkoutProduct = async function (req, res) {
  const checkoutProductid = req.params.id;
  try {
    let result = await productModel.updateOne(
      { _id: checkoutProductid },
      { $inc: { quantity: -1 } }
    );
    res.send(result);
  } catch (err) {
    res.send(err);
  }
  return;
};


Controllers.addToWishlist = async function(req, res){
    const wishlist_prod_id = req.params.id
    let result = await productModel.findById(wishlist_prod_id)
    return UserModel.updateOne({email:req.token.email},{$push: {wish_list: result}}).then((data)=>res.send("done"))
}


Controllers.deleteFromWishlist=async function(req, res){
    return UserModel.updateOne({email:req.token.email},{$pop: {wish_list: 1}}).then((data)=>res.send("deletion done"))
}

Controllers.showWishlist = async function(req, res){
    let result = await UserModel.findOne({email:req.token.email})
  
    res.send(result.wish_list)
}

Controllers.authorize = async function(req,res,next){
    try{
        let reqtoken=req.headers['authorization']
        const token=reqtoken.replace('Bearer ','')
        const result=jwt.verify(token,'abhisecret')
        req.token=result
        // console.log(req.token,'req token')
        next()
    }
    catch(err){
        console.log('err');
        res.send("error in authorization")
    }
}

Controllers.seachItems = async function (req, res) {
  const cateGory = req.params.category;
  let products = JSON.parse(req.body.product_list);
  let categoryList = products.filter((item) => item.category === cateGory);

  res.send(categoryList);
};
Controllers.sortLowertoHigher = async function (req, res) {
  let products = JSON.parse(req.body.product_list);
  products.sort((a, b) => {
    return a.price - b.price;
  });
  res.send(products);
};

Controllers.sortHighertoLow = async function (req, res) {
  let products = JSON.parse(req.body.product_list);
  products.sort((a, b) => {
    return b.price - a.price;
  });
  res.send(products);
};




module.exports = Controllers;
