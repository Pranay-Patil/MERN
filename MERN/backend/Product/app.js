const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const mongoose = require("./configs/mongoose");

app.use(express.urlencoded());
app.use(express.json())
app.use(cors())


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", require("./route"));

module.exports = app;
