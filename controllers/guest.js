const Guest = require('../models/Guest')
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

/**
 * @desc 添加一条guest信息(初始化积分)
 * @route POST /api/v1/user/:userId/guest
 * @params priavate
 */
exports.addGuest = asyncHandler(async (req, res, next) => {
    if (!req.params.userId) {
        return next(new ErrorResponse(`Resource not found with id of  ${req.params.userId}`, 401))
    }
    let user = User.findById(req.params.userId)
    if (!user) {
        return next(new ErrorResponse(`Resource not found with id of  ${req.params.userId}`, 401))
    }
    let { phone, luckScore, createAt, name } = req.body
    if (luckScore < process.env.Guest_LUCK_SCORE) {
        return next(new ErrorResponse(`积分必须大于等于${process.env.Guest_LUCK_SCORE}`, 400))
    }
    let guest = await Guest.create({ phone, luckScore, createAt, name, user: req.params.userId })
    res
        .status(200)
        .json({ success: true, data: guest })
})

/**
 * @desc 若guest已存在,则修改客人积分
 * @route PUT /api/v1/guest/:phone
 * @params priavate
 */
//
exports.updateGuestLuckScore = asyncHandler(async (req, res, next) => {
    let { luckScore, createAt,userId } = req.body
    if (luckScore < process.env.Guest_LUCK_SCORE) {
        return next(new ErrorResponse(`积分必须大于等于${process.env.Guest_LUCK_SCORE}`, 401))
    }
    if (!createAt) {
        return next(new ErrorResponse(`积分修改时间非空验证失败!`, 401))
    }
    let guest = await Guest.findById(req.params.guestId)
    if (!guest) {
        return next(new ErrorResponse(`Resource not found with id of  ${req.params.guestId}`))
    }
    guest.luckScore += luckScore;
    guest.createAt = createAt;
    guest.user=userId;
    await guest.save();
    res
        .status(200)
        .json({ success: true, data: guest })

})


/**
 * @desc 客人登陆时或前台查询时验证手机号是否有抽奖权限(在guest集合中查询是否有该手机记录)
 * @route GET /api/v1/guest/:phone
 * @params priavate
 */
//http://localhost:3000/api/v1/guest/:phone
exports.login = asyncHandler(async (req, res, next) => {
    let phone = req.params.phone;
    if (!phone) {
        return next(new ErrorResponse("请输入手机号!", 400));
    }
    let guest = await Guest.findOne({ phone })
    if (!guest) {
        return next(new ErrorResponse("没有权限抽奖!",400))
    }
    res.status(200).json({ success: true, data: guest })
})

