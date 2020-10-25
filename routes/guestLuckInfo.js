const express = require('express')
const router = express.Router({ mergeParams: true })
 const {addLuckInfo,getAllLuckInfo,updateGuestLuckScore}=require("../controllers/guestLuckInfo")

//router.route("/").post(addGuest)
//router.route("/:phone").get(getGuest)
//router.route("/:guestId").put(updateGuestLuckScore)
router.route("/:phone").post(addLuckInfo).get(getAllLuckInfo)
router.route("/:id").put(updateGuestLuckScore)
module.exports =router

