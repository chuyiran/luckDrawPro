const express = require('express')
const router = express.Router({ mergeParams: true })
const { addGuestLuckInfo } = require('../controllers/guest')

/**
 * @desc 添加一条客人中奖信息
 * @route POST  http://localhost:3000/guest
 * @param 公开
 */

router.route("/").post(addGuestLuckInfo)


module.exports =router

