/*jshint asi:true, trailing:true*/

var server = require('./lib/server'),
  handler = require('./lib/handler'),
  router = require('./lib/router')

// Setup the routes
server.setupRoutes(router, handler)

// Start listening
server.listen(3000)
