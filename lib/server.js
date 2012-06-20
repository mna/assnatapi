/*jshint asi:true, trailing:true*/

var restify = require('restify'),
  server

// Create the one and only server
server = restify.createServer({
  // For early development, set all API to version 0.1
  // 1.0 will be for first official public release.
  version: '0.1.0'
})

// Use the Query String parser
server.use(restify.queryParser())
// TODO : Use other restify plugins?

// Define the route setup method
server.setupRoutes = function(router, handler) {
  var hNames,
    hFunc

  // Apply routes and handlers to the server
  for (var i = 0; i < router.length; i++) {
    if (typeof router[i].handler === 'string') {
      this.get(router[i].path, handler[router[i].handler])
    } else {
      // Array of handlers
      hNames = router[i].handler
      hFunc = []
      for (var j = 0; j < hNames.length; j++) {
        hFunc.push(handler[hNames[j]])
      }
      this.get(router[i].path, hFunc)
    }
  }
}

module.exports = server
