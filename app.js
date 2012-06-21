/*jshint asi:true, trailing:true*/

var db = require('./lib/db'),
  server = require('./lib/server'),
  handler = require('./lib/handler')(db),
  router = require('./lib/router')

// Setup the routes
server.setupRoutes(router, handler)

// Start listening
server.listen(3000)
