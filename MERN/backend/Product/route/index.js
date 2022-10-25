const express = require("express");
const router = express.Router();
const Controllers = require("../controller/productcontroller");

router.post("/addproduct", Controllers.addProduct);
router.get("/viewproduct", Controllers.viewProduct);
router.get("/viewsingleproduct/:id", Controllers.viewSingleProduct);
router.delete("/deleteproduct/:id", Controllers.deleteProduct);
router.post("/updateproduct/:id", Controllers.updateProduct);
router.put("/checkoutproduct/:id", Controllers.checkoutProduct);
router.post("/addtowishlist/:id", Controllers.authorize, Controllers.addToWishlist)
router.get("/deletefromwishlist",Controllers.authorize,Controllers.deleteFromWishlist)
router.get("/showwishlist",Controllers.authorize, Controllers.showWishlist)
router.post("/search-items/:category", Controllers.seachItems);
router.post("/sort-items/lowtohigh", Controllers.sortLowertoHigher);
router.post("/sort-items/hightolow", Controllers.sortHighertoLow);

module.exports = router;
