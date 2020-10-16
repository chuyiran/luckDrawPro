// const aysncHandler = (fn) => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
// }

// function aysncHandler(fn) {
//     return function (req, res, next) {
//         return Promise.resolve(fn(req, res, next)).catch(next);
//     }
// }
const aysncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
module.exports = aysncHandler


