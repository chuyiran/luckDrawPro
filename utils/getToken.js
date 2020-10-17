const jwt = require("jsonwebtoken")
const getSingleToken = function () {
    return jwt.sign({
        id: this._id,
        phone: this.phone
    },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}
module.exports = getSingleToken;