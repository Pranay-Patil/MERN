const express= require("express")
const router = express.Router()
const Controllers = require("../controllers/checkoutController")


router.post("/checkout",Controllers.authorize , Controllers.checkout)
router.get("/showsalereport",Controllers.showSalesReport)


module.exports = router
