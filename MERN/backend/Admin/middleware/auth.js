const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  console.log("Cookies: ", req.cookies.jwttoken);
  try {
    const token = req.cookies.jwttoken;
    const result = jwt.verify(token, "sample-test");
    req.token = result;
    next();
  } catch (err) {
    res.send("Already Logout");
  }
}
module.exports = authentication;
