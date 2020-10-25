const express = require('express')
const router = express.Router({ mergeParams: true })
const { userRegister } = require('../controllers/user')

//定向路由
const guestRouter=require('./guest')
//const luckInfoRouter=require("./guestLuckInfo");
router.use("/:userId/guest",guestRouter)
//router.use("/:userId/guestLuckInfo",luckInfoRouter)
/**
 * @desc 添加一条客人中奖信息
 * @route POST  http://localhost:3000/guest
 * @param 公开
 */

router.route("/").post(userRegister)


module.exports =router

