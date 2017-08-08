const express = require('express')
const path = require('path')
const http = require('http')
const app = express()
const test = require('./test')
const port = 5000
let arr = new Array(20 * 1024 * 1024)

function master(longTimeConn) {

    app.set('port', port)
    app.use(longTimeConn)
    app.use('/', test.hello)
    let server = http.createServer(app)
    const sockets = []

    function error() {
        console.log(arr)
    }

    function listen() {
        console.log('服务启动完成')
    }

    function conn(socket) {
        sockets.push(socket);
        socket.once("close", function () {
            sockets.splice(sockets.indexOf(socket), 1)
        })
    }
    server.on('error', error)
    server.on('listening', listen)
    server.on("connection", conn)
    server.listen(port)
    let r = {
        close: function (done) {
            sockets.forEach(function (socket) {
                socket.destroy()
            })
            server.close((err) => {
                console.log('服务关闭')
                if (err) {
                    done(err)
                }
                done()
            })
        }
    }
    return r
}
const result = master
module.exports = result