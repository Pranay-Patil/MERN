const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

const bodyparser= require("body-parser")
app.use(bodyparser.json())


const routes= require("./routes/checkoutRoute")
app.use("/",routes)

module.exports = app