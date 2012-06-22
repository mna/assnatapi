var restify = require('restify'),
  server

// Create the one and only server
server = restify.createServer({
  // For early development, set all API to version 0.1
  // 1.0 will be for first official public release.
  version: '0.1.0'
})

/*
** Middleware
*/

// Use the accept header middleware (respond with 406 if not supported content is requested)
server.use(restify.acceptParser(server.acceptable))
// Use the query string parser
server.use(restify.queryParser())
// Throttle the requests
server.use(restify.throttle({
  burst: 100,
  rate: 50,
  ip: true
}))

/*
** Route setup
*/

// Define the route setup method
server.setupRoutes = function(router, handler) {
  var hNames,
    hFunc,
    f

  // Apply routes and handlers to the server
  for (var i = 0; i < router.length; i++) {
    if (typeof router[i].handler === 'string') {
      f = handler[router[i].handler]
      if (!f) {
        throw new Error('Undefined handler ' + router[i].handler + ' for route ' + router[i].path)
      }
      this.get(router[i].path, f)
    } else {
      // Array of handlers
      hNames = router[i].handler
      hFunc = []
      for (var j = 0; j < hNames.length; j++) {
        f = handler[hNames[j]]
        if (!f) {
          throw new Error('Undefined handler ' + hNames[j] + ' for route ' + router[i].path)
        }
        hFunc.push(f)
      }
      this.get(router[i].path, hFunc)
    }
  }
}

module.exports = server
