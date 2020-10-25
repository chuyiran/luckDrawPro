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
const GuestLuckInfoSchema = new mongoose.Schema({
    phone: {//手机号
        type: String,
        required: [true, "请填写手机号码！"],
        match: [/^1[3456789]\d{9}$/, '请填写正确的手机号！'],
        unique: true,
        trim: true,
        index: true
    },
    luckCategory: {//中奖物品
        type: String,
        required: [true, "中奖品非空验证失败!"]
    },
    luckTime: {//中奖时间
        type: Number,
        required: [true, "中奖时间不能为空"]
    },

    destroyLuck: {//核销时间
        type: Number,
    },
    //isDestroyLuck:{//核销状态
    //    type:Boolean,
    //    default: false
    //},
    role: {//角色
        type: String,
        enum: ['guest', 'vip'],
        default: 'guest',
    },
    user: {//操作员
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
})
////生成tokenGuest
GuestLuckInfoSchema.methods.getSingleToken = getSingleToken
module.exports = mongoose.model("GuestLuckInfo", GuestLuckInfoSchema)
