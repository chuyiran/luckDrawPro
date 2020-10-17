//引入mongoose模块
const mongoose = require('mongoose')
//加入加密模块
const bcrypt = require("bcryptjs")
//引入生成token方法
const getSingleToken = require("../utils/getToken")
//实例化User模型
const GuestSchema = new mongoose.Schema({
    phone: {//手机号
        type: String,
        required: [true, "请填写手机号码！"],
        match: [/^1[3456789]\d{9}$/, '请填写正确的手机号！']
    },
    luckCategory: {//中奖类型
        type: String,
        required: [true, "密码不能为空"],
    },
    role: {//角色
        type: String,
        enum: ['guest', 'vip'],
        default: 'guest',
    },
    luckTime: {//中奖时间
        type: Number,
        required: [true, "中奖时间不能为空"]
    },
    destroyTime: {//核销时间
        type: Number
    },
    user: {//操作员
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
})
////生成tokenGuest
GuestSchema.methods.getSingleToken = getSingleToken
module.exports = mongoose.model("Guest", GuestSchema)
