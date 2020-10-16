//引入mongoose模块
const mongoose = require('mongoose')
//加入加密模块
const bcrypt = require("bcryptjs")
//引入token模块
const jwt = require("jsonwebtoken")
//实例化User模型
const UserSchema = new mongoose.Schema({
    phone: {//手机号
        type: String,
        require: [true, "请填写手机号码！"],
        match: [/^1[3456789]\d{9}$/, '请填写正确的手机号！']
    },
    luckCategroy: {//中奖类型
        type: String,
        required: [true, "密码不能为空"],
    },
    role: {//角色
        type: String,
        enum: ['guest','vip','guestWhite'],
        default: 'guestWhite',
    },
    luckTime: {//中奖时间
        type:Number,
        required: [true,"中奖时间不能为空"]
    },
    destroyTime:{//核销时间
        type: Number
    },
    user: {//操作员
        type:mongoose.Schema.ObjectId,
        ref:'User',
    }
})
////生成tokenGuest
GuestSchema.methods.getSingleToken = function () {
    return jwt.sign({
        id: this._id,
        phone: this.phone
    },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

