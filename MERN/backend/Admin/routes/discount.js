const bulkUpdate = require("../controllers/discount/bulkUpdate");
const coupon = require("../controllers/discount/coupon");
const discount = require("../controllers/discount/discount");
const express= require("express");
const router = express.Router();

router.post("/bulkupdate", bulkUpdate.bulkUpdate);
router.post("/coupon",coupon.couponCreate);
router.post("/discount" , discount.discount);

module.exports = router