/**
 * webpack server prod 配置
 */
var path = require('path')
var nodeExternals = require('webpack-node-externals')
var config = {
    entry: {
        app: path.join(__dirname, './index.js')
    },

    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'master'
    },
    resolve: {
        extensions: ['.js']
    },
    externals: [nodeExternals({
        modulesDir: path.join(__dirname, 'node_modules')
    })],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: false,
        __dirname: false,
        setImmediate: true
    },
    // devtool: '#source-map'
}

module.exports = config