const webpack = require('webpack')
const config = require('./webpack.server.conf')
const compiler = webpack(config)

function longTimeConn(req, res, next) {
    req.conn = 'i am  longTimeConn'
    next()
}
let app
compiler.watch({}, (err, state) => {
    console.log('编译完成')
    if (err) {
        console.log(err)
    } else {
        if (!app) {
            app = require('./build/index')(longTimeConn)
        } else {
            app.close(function () {
                let mod = require.cache[require.resolve('./build/index')]
                delete require.cache[require.resolve('./build/index')]
                let ix = mod.parent.children.indexOf(mod)
                if (ix >= 0) mod.parent.children.splice(ix, 1)
                app = require('./build/index')(longTimeConn)
            })
        }
    }
})



// test *******************
// setInterval(function () {
//     if (!app) {
//         app = require('./build/index')
//     } else {
//         app.close(function () {
//             let mod = require.cache[require.resolve('./build/index')]
//             delete require.cache[require.resolve('./build/index')]
//             let ix = mod.parent.children.indexOf(mod)
//             if (ix >= 0) mod.parent.children.splice(ix, 1)
//             app = require('./build/index')
//         })
//     }
// }, 500)

// setInterval(function () {
//     console.log("*****************")
//     console.log(process.memoryUsage())
//     console.log("*****************")
// }, 1000)