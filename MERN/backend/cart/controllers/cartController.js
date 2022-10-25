const jwt = require("jsonwebtoken")
const cartModel = require("../model/cartModel")
const productModel= require("../model/productmodel")


Controllers = {}

Controllers.addToCart= async function(req, res){
    const cart_prod_id = req.params.id
    let data = await productModel.findById(cart_prod_id)
    console.log(data)
    try{
        let result = await cartModel.create({
            email:req.token.email,
            title:data.title,
            price:data.price,
            description:data.description,
            category:data.category,
            quantity:1,
            image:data.image
        })
    res.send(result)
    }
    catch(err){
        res.send(err)
    }
    return;
}


Controllers.showCart= async function(req, res){
    let result = await cartModel.find({email:req.token.email})
    res.send(result)
}

Controllers.incrementQuantity= async function(req, res){
    const inc_prod_id= req.params.id
    try{
    let result= await cartModel.updateOne({_id:inc_prod_id},{ $inc: { quantity: 1 } })
    res.send(result)
    }
    catch(err){
        res.send(err)
    }
    return;
}

Controllers.decrementQuantity = async function(req, res){
    const inc_prod_id= req.params.id
    try{
    let result= await cartModel.updateOne({_id:inc_prod_id},{ $inc: { quantity: -1 } })
    res.send(result)
    }
    catch(err){
        res.send(err)
    }
    return;
}

Controllers.deleteFromCart= async function(req, res){
    const del_cart_id= req.params.id
    return cartModel.findByIdAndDelete(del_cart_id).then((result)=>res.send(`item deleted`)).catch((err)=>console.log("error while deleting"))
}


Controllers.authorize = async function(req,res,next){
    try{
        let reqtoken=req.headers['authorization']
        const token=reqtoken.replace('Bearer ','')
        const result=jwt.verify(token,'abhisecret')
        req.token=result
        console.log(req.token.email)
        next()
    }
    catch(err){
        res.send("error in authorization")
    }
}




module.exports = Controllers
