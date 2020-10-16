//引入mongoose模块
const mongoose = require('mongoose')
//加入加密模块
const bcrypt = require("bcryptjs")
//引入token模块
const jwt = require("jsonwebtoken")
//实例化User模型
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "姓名不能为空"],
        unique: true,
    },
    passwords: {
        type: String,
        required: [true, "密码不能为空"],
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'finance', 'white'],
        default: 'white',
    }
})
//密码加密
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
//验证密码
UserSchema.methods.matchPassword = function (enterPwd) {
    return bcrypt.compareSync(enterPwd, this.password)
}
//生成token
UserSchema.methods.getSingleToken = function () {
    return jwt.sign({
        id: this._id,
        name: this.name
    },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

module.exports = mongoose.model("User", UserSchema)