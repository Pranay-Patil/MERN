const jwt = require("jsonwebtoken")
const salesModel = require("../model/salesModel")
const cartModel = require("../model/cartModel")
const productModel = require("../model/productModel")


Controllers = {}

// ----The checkout function will do these tasks:----
//1.  copy all the data from the cart in sales Model
//2.  make the cart empty
//3.  decrease the product quantity from the product

Controllers.checkout= async function(req, res){
    let data = await cartModel.find({email:req.token.email})
    data.map(async (item)=>{
        try{
            let result = await salesModel.create({
            email:item.email,
            title:item.title,
            price:item.price,
            description:item.description,
            category:item.category,
            quantity:item.quantity,
            date:new Date().toLocaleString()
        })
        }
        catch(err){
            console.log(err)
        }
        console.log(item.quantity)
        let tem= await productModel.updateOne({title:item.title},{ $inc: { quantity: -(item.quantity) } })
    })
    let temp= await cartModel.deleteMany({email:req.token.email})
    res.send("checkout work done")
}

Controllers.showSalesReport = function(req, res){
    return salesModel.find().then((result)=>res.send(result)).catch((err)=>res.send("some error occurd"))
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
