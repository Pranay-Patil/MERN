const express = require("express");
const router = express.Router();
const userController = require("../controllers/create/user");

// const checkAdmin = require("../middleware/auth");

/*******CRUD ON USER */

router.post("/create-user", userController.createUser);
router.get("/user-lists", userController.readUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.post("/update-user/:id", userController.updateUser);

module.exports = router;
