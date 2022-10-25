// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jsonwebtoken = require("jsonwebtoken");

// module.exports.home = function (req, res) {
//   res.render("home");
// };
// module.exports.signUp = function (req, res) {
//   res.render("sign_up");
// };

// module.exports.signIn = function (req, res) {
//   res.render("sign_in");
// };
// ////we are creating user i.e.sign-up user
// module.exports.create = async function (req, res) {
//   const existuser = await User.findOne({ email: req.body.email });
//   if (existuser) {
//     res.send("User Already created");
//   } else {
//     const hashedpassword = await bcrypt.hash(req.body.password, 1);
//     User.create(
//       {
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedpassword,
//         user_type: "user",
//       },
//       function (err, user) {
//         if (err) return err;
//         res.send("New User created");
//       }
//     );
//   }
// };
// ////we are login user i.e.sign-in user
// module.exports.createSession = async function (req, res) {
//   const existuser = await User.findOne({ email: req.body.email });
//   if (existuser) {
//     const checkPass = await bcrypt.compare(
//       req.body.password,
//       existuser.password
//     );
//     if (checkPass) {
//       var jsontoken = jsonwebtoken.sign(
//         { email: existuser.email, name: existuser.name, user_type: "user" },
//         "abhisecret",
//         {
//           expiresIn: "1h",
//         }
//       );
//       res.cookie("jwttoken", jsontoken, {
//         maxAge: 36000000,
//       });
//       return res.send({
//         msg: "Sign In Successfully",
//         token: jsontoken,
//         status: true,
//         statusCode: 200,
//       });
//     } else {
//       return res.send({
//         msg: "Invalid Password",
//         status: false,
//         statusCode: 404,
//       });
//     }
//   } else {
//     return res.send({
//       msg: "Invalid Username",
//       status: false,
//       statusCode: 404,
//     });
//   }
// };
// module.exports.logOut = function (req, res) {
//   res.clearCookie("jwttoken");
//   res.send("Logout Successfully");
// };
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

module.exports.home = function (req, res) {
  res.render("home");
};
module.exports.signUp = function (req, res) {
  res.render("sign_up");
};

module.exports.signIn = function (req, res) {
  res.render("sign_in");
};
////we are creating user i.e.sign-up user
module.exports.create = async function (req, res) {
  const existuser = await User.findOne({ email: req.body.email });
  if (existuser) {
    res.send({
      msg: "User Already Exists",
      status: false,
      statusCode: 404,
    });
  } else {
    const hashedpassword = await bcrypt.hash(req.body.password, 1);
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword,
        user_type: "user",
      },
      function (err, user) {
        if (err) return err;
        res.send({
          msg: "SignUp Successfull",
          status: true,
          statusCode: 200,
        });
      }
    );
  }
};
////we are login user i.e.sign-in user
module.exports.createSession = async function (req, res) {
  const existuser = await User.findOne({ email: req.body.email });
  if (existuser) {
    const checkPass = await bcrypt.compare(
      req.body.password,
      existuser.password
    );
    if (checkPass) {
      var jsontoken = jsonwebtoken.sign(
        { email: existuser.email, name: existuser.name, user_type: "user" },
        "abhisecret",
        {
          expiresIn: "1h",
        }
      );
      res.cookie("jwttoken", jsontoken, {
        maxAge: 36000000,
      });
      return res.send({
        msg: "Sign In Successfully",
        token: jsontoken,
        status: true,
        statusCode: 200,
      });
    } else {
      return res.send({
        msg: "Invalid Password",
        status: false,
        statusCode: 404,
      });
    }
  } else {
    return res.send({
      msg: "Invalid Username",
      status: false,
      statusCode: 404,
    });
  }
};
module.exports.logOut = function (req, res) {
  res.clearCookie("jwttoken");
  res.send({
    msg: "Logout Successful",
    status: true,
    statusCode: 200,
  });
};