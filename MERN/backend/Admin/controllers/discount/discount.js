const Coupon = require("../../models/Coupon");

exports.discount = (req, res) => {
  const { couponName } = req.body;
  console.log(couponName);
  Coupon.findOne({ couponName: couponName }).then((response) => {
    console.log(response);
    if(response === null){
        res.status(401).send({message:"Invalid Coupon name"});
    }else{
        res.send({ couponDiscount: response["couponDiscount"] , message:"Successfully coupon is applied "});
    }
  });
};
