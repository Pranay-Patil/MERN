const express = require("express")
const router = express.Router()
const checkout = require("../controllers/checkout/checkout")


router.post("/checkout", checkout.authorize, checkout.checkout)
router.get("/showsalereport", checkout.showSalesReport)


module.exports = router
