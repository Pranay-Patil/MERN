const express = require("express");
const authentication = require("../middleware/auth");
const router = express.Router();
const homeControler = require("../controllers/home_controller");

router.get("/sign-in", homeControler.signIn);
router.get("/sign-up", homeControler.signUp);
router.get("/logout", authentication, homeControler.logOut);

router.post("/create", homeControler.create);
router.post("/create-session", homeControler.createSession);

router.use("/user", require("./user"));
router.get("/", homeControler.home);

module.exports = router;
