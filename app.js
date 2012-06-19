/*jshint asi:true, trailing:true*/

var server = require('./lib/server'),
  handler = require('./lib/handler'),
  router = require('./lib/router')

// Apply routes and handlers to the server
for (var i = 0; i < router.length; i++) {
  server.get(router[i].path, handler[router[i].handler])
}

// Start listening
server.listen(3000)
