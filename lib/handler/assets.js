/*jshint asi:true, trailing:true*/

var staticServer = require('node-static'),
  OneDayInMs = (24 * 60 * 60 * 60 * 1000),
  path = require('path'),
  handler = {},
  fileServer

fileServer = new staticServer.Server(path.resolve(__dirname, '../../public'), {cache: OneDayInMs})

handler.serveIndex = function(req, res, next) {
  fileServer.serveFile('/index.html', 200, {}, req, res, next)
}

handler.serveFile = function(req, res, next) {
  fileServer.serve(req, res, next)
}

module.exports = handler
