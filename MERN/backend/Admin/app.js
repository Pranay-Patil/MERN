const express = require("express");
const server = express();
const mongoose = require("./configs/mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require('cors')

server.use(cookieParser());
server.use(express.urlencoded());
server.use(bodyParser.json());
server.use(cors())
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use("/", require("./routes"));

module.exports = server;
