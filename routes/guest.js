const express = require('express')
const router = express.Router({ mergeParams: true })
const { addGuest,login,updateGuestLuckScore} = require('../controllers/guest')


//post http://localhost:3000/api/v1/user/:userId/guest  addGuest
router.route("/").post(addGuest)


//Get http://localhost:3000/api/v1/:phone    login
//Put http://localhost:3000/api/v1/:phone    updateGuestLuckScore

router.route("/:phone").get(login).put(updateGuestLuckScore)



module.exports =router

