const Coupon = require("../../models/Coupon");

exports.couponCreate = async (req, res) => {
    const couponcreate = req.body;
    await Coupon.create(couponcreate)
      .then((value) => {
        res.send('Coupon created successfully')
      })
      .catch((error) => {
        console.log(error);
      });
  };
