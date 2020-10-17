const Guest= require('../models/Guest')
const ErrorResponse=require("../utils/errorResponse")
const asyncHandler=require('../middleware/async')

exports.addGuestLuckInfo=asyncHandler(async(req,res,next)=>{
    const {phone,luckCategory,luckTime}=req.body
    console.log(req.body);
    const guest=await Guest.create({phone,luckCategory,luckTime})
    //生成token
    let token=guest.getSingleToken();
    res
    .status(200)
    .json({ success: true, token })

})
