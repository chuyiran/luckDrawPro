//引入错误处理类
const ErrorResponse = require("../utils/errorResponse")
// 捕获错误处理
const errorHandler = (err, req, res, next) => {
    // console.log(err.stack.red);//err.stack错误信息。
    //id数据源报错
    if (err.name == "CastError") {
        const message = `Resource not found With id of ${err.value}`
        err = new ErrorResponse(message, 404)
    }
    //返回重复字段响应
    if (err.code == 11000) {
        const message = "输入了重复字段";
        err = new ErrorResponse(message, 400)
    }
    //校验失败
    if (err.name == 'ValidationError') {
        console.log(Object.values(err.errors))
        const message = Object.values(err.errors).map(val => val.message)
        // console.log(Object.values(err.errors)[0].message)
        err = new ErrorResponse(message, 400)
    }
    res
        .status(err.statusCode || 500)
        .json({ success: false, error: err.message || "Server Error" })
}
module.exports = errorHandler