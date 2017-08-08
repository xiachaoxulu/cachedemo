(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("express"), require("path"), require("http"));
	else if(typeof define === 'function' && define.amd)
		define(["express", "path", "http"], factory);
	else if(typeof exports === 'object')
		exports["master"] = factory(require("express"), require("path"), require("http"));
	else
		root["master"] = factory(root["express"], root["path"], root["http"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(1)
const path = __webpack_require__(2)
const http = __webpack_require__(3)
const app = express()
const test = __webpack_require__(4)
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const r = __webpack_require__(5)
const arr = new Array(20 * 1024 * 1024)
exports.hello = function (req, res, next) {
    res.send(r.tool() + req.conn)
    res.end()
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

exports.tool = function () {
    return 3
}

/***/ })
/******/ ]);
});