//引入mongoose模块
const mongoose = require('mongoose')
//加入加密模块
const bcrypt = require("bcryptjs")
//引入生成token方法
const getSingleToken = require("../utils/getToken")
//引入环境变量模块
const dotenv = require("dotenv")
//全局环境变量配置
dotenv.config({
    path: './config/config.env'
})

//实例化User模型
const GuestSchema = new mongoose.Schema({
    phone: {//手机号
        type: String,
        required: [true, "请填写手机号码！"],
        match: [/^1[3456789]\d{9}$/, '请填写正确的手机号！'],
        unique: true,
        trim: true,
        index: true
    },
    name: {
        type: String,
        required: [true, "请输入客人姓名"]
    },
    luckScore: {
        type: Number,
        required: [true, "请输入积分"]
        //min: process.env.Guest_LUCK_SCORE
    },
    role: {//角色
        type: String,
        enum: ['guest', 'vip'],
        default: 'guest',
    },
    user: {//操作员
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createAt: {
        type: Number,
        required: [true, "创建时间不能为空"]
    }
})
////生成tokenGuest
GuestSchema.methods.getSingleToken = getSingleToken
module.exports = mongoose.model("Guest", GuestSchema)
