const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const couponSchema = new schema({
  couponName: {
    type: String,
    required: true,
  },
  couponDiscount: {
    type: Number,
    required: true,
  },
});

const Coupon = mongoose.model("CouponData", couponSchema);

module.exports = Coupon;
