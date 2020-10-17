//引入模块
const express = require('express');
const dotenv = require("dotenv")
const morgan = require('morgan')
const colors = require('colors')
const connentDB = require('./config/db')
const errorHandler = require("./middleware/error")
//引入路由文件
const guest=require('./routes/guest')
//全局环境变量配置
dotenv.config({
    path: './config/config.env'
})
//数据数据库
connentDB()
let app = express()
//配置body
app.use(express.json())
//使用中间件
app.use(morgan('dev'))
//挂载路由
app.use("/api/v1/guest",guest)
//使用异常捕获
app.use(errorHandler)
//定义端口
let PORT = process.env.PORT || 3001
//监听端口并启动服务器
const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow))
//监听错误
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:${err.message}`.red.bold)
    //关闭服务器&退出进程
    server.close(() => {
        process.exit(1)
    })
})
