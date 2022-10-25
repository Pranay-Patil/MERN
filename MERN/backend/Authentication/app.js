const express = require("express")
const server = express()

server.get("/",(req, res)=>{
    res.send("this is authentication page")
})

server.get("/dashboard",(req, res)=>{
    res.send("this is authentication dashboard")
})

module.exports = server