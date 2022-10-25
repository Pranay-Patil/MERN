module.exports.showAdmin = function (req, res) {
  res.send("Admin List");
};

const User = require("../models/User");
const Admin = require("../models/Admin");

module.exports.createUser = async function (req, res) {
  const existuser = await User.findOne({ email: req.body.email });
  if (existuser) {
    return res.send("User Already exists");
  } else {
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        user_type: "user",
      },
      function (err, user) {
        if (err) return err;

        return res.send("New User Created");
      }
    );
  }
};
module.exports.readUser = async function (req, res) {
  const user = await User.find({});
  return res.send({
    msg: "userlist",
    user_list: user,
    status: true,
  });
};
module.exports.updateUser = async function (req, res) {
  var user = await User.findByIdAndUpdate(
  
      req.params.id,
  
    {
      name: req.body.name,
    }
  );
  return res.send("Updated Successfully");
};
module.exports.deleteUser = async function (req, res) {
  var user = await User.findByIdAndDelete(req.params.id)
  return res.send("Deleted Suceesfully");
};
