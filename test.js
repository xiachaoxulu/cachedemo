const r = require('./tool')
const arr = new Array(20 * 1024 * 1024)
exports.hello = function (req, res, next) {
    res.send(r.tool() + req.conn)
    res.end()
}