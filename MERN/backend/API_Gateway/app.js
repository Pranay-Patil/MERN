const express = require("express")
const app= express()
const config= require("./config")
const {createProxyMiddleware} = require("http-proxy-middleware")

const cors = require("cors")
app.use(cors())

app.use("/user", createProxyMiddleware({
    target:config.userServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/user':'/'
    }
}))

app.use("/admin", createProxyMiddleware({
    target: config.adminServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/admin':'/'
    }
}))


app.use("/product", createProxyMiddleware({
    target:config.productServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/product':'/'
    }
}))

app.use("/fastmailadmin", createProxyMiddleware({
    target:config.fastmailAdminServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/fastmailadmin':'/'
    }
}))

app.use("/bulk", createProxyMiddleware({
    target:config.bulkUploadServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/bulk':'/'
    }
}))

app.use("/cart", createProxyMiddleware({
    target:config.cartServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/cart':'/'
    }
}))

app.use("/fastmail", createProxyMiddleware({
    target:config.fastmailServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/fastmail':'/'
    }
}))
app.use("/checkout", createProxyMiddleware({
    target:config.checkoutServices_URL,
    changeOrigin:true,
    pathRewrite:{
        '^/checkout':'/'
    }
}))

module.exports= app