const User = require('../models/User')
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require('../middleware/async')

/**
 * @desc 前台注册操作员
 * @route Post /api/v1/user
 * @params priavate
 */
//http://localhost:3000/api/v1/guest/:phone
exports.userRegister = asyncHandler(async (req, res, next) => {
    let {name,password} =req.body
    if(!name || !password){
        return next(new ErrorResponse("用户名或密码不能为空!",400))
    }
    let user = await User.create({name,password})
    res
        .status(200)
        .json({ success: true, user })
})
 

/**
 * @desc 前台注册操作员
 * @route Post /api/v1/user
 * @params priavate
 */
//http://localhost:3000/api/v1/guest/:phone
exports.updateLuckStatus = asyncHandler(async (req, res, next) => {
    let {name,password} =req.body
    if(!name || !password){
        return next(new ErrorResponse("用户名或密码不能为空!",400))
    }
    let user = await User.create({name,password})
    res
        .status(200)
        .json({ success: true, user })
})
 