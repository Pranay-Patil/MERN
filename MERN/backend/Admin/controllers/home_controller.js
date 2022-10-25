// const Admin = require("../models/Admin");
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

// module.exports.create = async function (req, res) {
//   const existuser = await Admin.findOne({ email: req.body.email });
//   if (existuser) {
//     res.send("User Already created");
//   } else {
//     const hashedpassword = await bcrypt.hash(req.body.password, 1);
//     Admin.create(
//       {
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedpassword,
//         user_type: "admin",
//       },
//       function (err, user) {
//         if (err) return err;
//         res.send("New User created");
//       }
//     );
//   }
// };
// module.exports.createSession = async function (req, res) {
//   const existuser = await Admin.findOne({ email: req.body.email });
//   if (existuser) {
//     const checkPass = await bcrypt.compare(
//       req.body.password,
//       existuser.password
//     );
//     if (checkPass) {
//       var jsontoken = jsonwebtoken.sign(
//         { email: existuser.email, name: existuser.name, user_type: "admin" },
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
//         statusCode: 404,
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
const Admin = require("../models/Admin");
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

module.exports.create = async function (req, res) {
  const existuser = await Admin.findOne({ email: req.body.email });
  if (existuser) {
    res.send({
      msg: "Admin Already Exists",
      status: false,
      statusCode: 404,
    });
  } else {
    const hashedpassword = await bcrypt.hash(req.body.password, 1);
    Admin.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword,
        user_type: "admin",
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
module.exports.createSession = async function (req, res) {
  const existuser = await Admin.findOne({ email: req.body.email });
  if (existuser) {
    const checkPass = await bcrypt.compare(
      req.body.password,
      existuser.password
    );
    if (checkPass) {
      var jsontoken = jsonwebtoken.sign(
        { email: existuser.email, name: existuser.name, user_type: "admin" },
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
  res.send("Logout Successfully");
};
