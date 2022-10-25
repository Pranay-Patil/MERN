const express = require("express");
const { default: mongoose } = require("mongoose");
const {bulkUpdate} = require("./controller/bulkUpdate");
const {couponCreate}=require("./controller/createCoupon");
const {discount} = require("./controller/discount");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const URL =
  "mongodb+srv://abhi_capstone:g3capstone@cluster0.jwbklkz.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URL)
  .then((res) => {
    console.log("Success");
  })
  .catch((err) => {
    console.log("Error ", err);
  });

app.post("/bulkupdate", bulkUpdate);
app.post("/coupon",couponCreate);
app.post("/discount" , discount);

module.exports = app
