/*jshint asi:true, trailing:true*/

var restify = require('restify'),
  server

server = restify.createServer({
  // For early development, set all API to version 0.1
  // 1.0 will be for first official public release.
  version: '0.1.0'
})
server.use(restify.queryParser())

module.exports = server
