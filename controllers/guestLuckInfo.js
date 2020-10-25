const Guest = require('../models/Guest')
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require('../middleware/async')
const User = require('../models/User')
const GuestLuckInfo = require("../models//GuestLuckInfo")

/**
 * @desc 添加一条客人中奖记录信息,同时幸运分也减掉.
 * @route GET /api/v1/guest/:phone
 * @params priavate
 */
//http://localhost:3000/api/v1/guestLuckInfo/:phone
exports.addLuckInfo = asyncHandler(async (req, res, next) => {
    let phone = req.params.phone;
    if (!phone) {
        return next(new ErrorResponse("手机号非空验证失败!", 400));
    }
    let guest = await Guest.findOne({ phone })

    if (!guest || guest.luckScore < process.env.MIX_LUCK_SCORE) {
        return next(new ErrorResponse("您还没有积分或者您的积分不足,无法进行抽奖活动!", 400))
    }
    guest.luckScore -= process.env.MIX_LUCK_SCORE
    await guest.save()
    let { luckCategory, luckTime, role } = req.body
    let guestLuckInfo = await GuestLuckInfo.create({
        luckCategory,
        luckTime,
        role,
        phone: req.params.phone
    })
    res.status(200).json({ success: true, data: guestLuckInfo })
})


/**
 * @desc 根据手机号查询所有中奖信息
 * @route GET /api/v1/guestLuckInfo/:phone
 * @params priavate
 */
//http://localhost:3000/api/v1/guestLuckInfo/:phone
exports.getAllLuckInfo = asyncHandler(async (req, res, next) => {
    let phone = req.params.phone;
    if (!phone) {
        return next(new ErrorResponse("请输入手机号!", 400));
    }
    let guestLuckInfo = await GuestLuckInfo.find({ phone: phone })
    res.status(200).json({ success: true, data: guestLuckInfo })
})

/**
 * @desc 抽奖后核销(更改)
 * @route GET /api/v1/guestLuckInfo/:phone
 * @params priavate
 */
//http://localhost:3000/api/v1/guestLuckInfo/:id

exports.updateGuestLuckScore = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    if (!id) {
        return next(new ErrorResponse(`Resource not found with id of  ${req.params.id}`));
    }
    const {  destroyLuck, user } = req.body;
    let guestLuckInfo = await GuestLuckInfo.findById (id);
    guestLuckInfo.user = user;
    guestLuckInfo.destroyLuck = destroyLuck;
    await guestLuckInfo.save();0
    res.status(200).json({ success: true, data: guestLuckInfo })
})
