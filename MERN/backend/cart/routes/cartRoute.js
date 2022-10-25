const express= require("express")
const router = express.Router()
const Controllers = require("../controllers/cartController")


router.post("/addtocart/:id",Controllers.authorize, Controllers.addToCart)
router.get("/showcart", Controllers.authorize, Controllers.showCart)
router.delete("/deletefromcart/:id", Controllers.authorize, Controllers.deleteFromCart)
router.put("/incrementquantity/:id", Controllers.authorize, Controllers.incrementQuantity)
router.put("/decrementquantity/:id", Controllers.authorize, Controllers.decrementQuantity)



module.exports = router

