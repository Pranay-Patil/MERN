const express = require("express");
const router = express.Router();
const product = require("../controllers/product/product");

router.post("/addproduct", product.addProduct);
router.get("/viewproduct", product.viewProduct);
router.get("/viewsingleproduct/:id", product.viewSingleProduct);
router.delete("/deleteproduct/:id", product.deleteProduct);
router.post("/updateproduct/:id", product.updateProduct);
router.put("/checkoutproduct/:id", product.checkoutProduct);
router.post("/addtowishlist/:id", product.authorize, product.addToWishlist)
router.get("/deletefromwishlist",product.authorize,product.deleteFromWishlist)
router.get("/showwishlist",product.authorize, product.showWishlist)
router.post("/search-items/:category", product.seachItems);
router.post("/sort-items/lowtohigh", product.sortLowertoHigher);
router.post("/sort-items/hightolow", product.sortHighertoLow);

module.exports = router;
