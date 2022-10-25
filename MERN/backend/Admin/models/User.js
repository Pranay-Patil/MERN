const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  user_type: String,
  cart_list: [],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
