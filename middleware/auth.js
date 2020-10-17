//路由鉴权
const ErrorrResponse = require("../utils/errorResponse")
const asyncHandler = require("./async")
const jwt = require("jsonwebtoken")



const auth = (model) => async (req, res, next) => {
    let token = ""
    //判断该请求是否有携带token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ErrorResponse("无权访问该路由!", 400))
    }
    try {
        //验证token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.result = await model.findById(decoded.id)
    } catch (error) {
        return next(new ErrorResponse("无权限访问该路由!"))
    }
}
module.exports = auth