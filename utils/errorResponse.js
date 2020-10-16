//错误处理error类
class ErrorResponse extends Error{
    constructor (message,statusCode){
        super(message);
        this.statusCode=statusCode
    }
}
module.exports =ErrorResponse