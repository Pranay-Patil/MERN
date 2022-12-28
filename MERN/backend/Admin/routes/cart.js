const express= require("express")
const router = express.Router()
const cart = require("../controllers/cart/cart")


router.post("/addtocart/:id",cart.authorize, cart.addToCart)
router.get("/showcart", cart.authorize, cart.showCart)
router.delete("/deletefromcart/:id", cart.authorize, cart.deleteFromCart)
router.put("/incrementquantity/:id", cart.authorize, cart.incrementQuantity)
router.put("/decrementquantity/:id", cart.authorize, cart.decrementQuantity)



module.exports = router

