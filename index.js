const express = require('express');
const dotenv = require("dotenv")

dotenv.config({
    path:'./config/config.env'
})

let app =new express()
app.get("/", (req, res) => {
    res.status(200).json({ success: true })
})
//定义端口
let port = process.env.PORT || 3001
//端口监听
//端口监听与启动服务
app.listen(port, () => {
    console.log(`Server is running  in ${process.env.NODE_ENV} node on prot ${port}`);
})