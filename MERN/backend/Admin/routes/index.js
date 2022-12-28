const express = require("express");
const authentication = require("../middleware/auth");
const user = require("./user");
const router = express.Router();
const createControler = require("../controllers/create/admin");
const cart = require("./cart");
const product = require("./product");
const checkout = require("./checkout");
const discount = require("./discount");

router.get("/sign-in", createControler.signIn);

router.get("/sign-up", createControler.signUp);

router.get("/logout", authentication, createControler.logOut);

router.post("/create", createControler.create);

router.post("/create-session", createControler.createSession);

router.use("/cart",cart);

router.use("/user",user);

router.use("/product",product);

router.use("/checkout",checkout);

router.use("/discount",discount);

router.get("/", createControler.home);

module.exports = router;
