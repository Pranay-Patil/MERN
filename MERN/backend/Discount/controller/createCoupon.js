const couponModel =require("../model/coupon");


exports.couponCreate = async (req, res) => {
    const couponcreate = req.body;
    await couponModel.create(couponcreate)
      .then((value) => {
        res.send('Coupon created successfully')
      })
      .catch((error) => {
        console.log(error);
      });
  };