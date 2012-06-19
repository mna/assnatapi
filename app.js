/*jshint asi:true, trailing:true*/

var server = require('./lib/server'),
  handler = require('./lib/handler'),
  router = require('./lib/router'),
  hNames,
  hFunc

// Apply routes and handlers to the server
for (var i = 0; i < router.length; i++) {
  if (typeof router[i].handler === 'string') {
    server.get(router[i].path, handler[router[i].handler])
  } else {
    // Array of handlers
    hNames = router[i].handler
    hFunc = []
    for (var j = 0; j < hNames.length; j++) {
      hFunc.push(handler[hNames[j]])
    }
    server.get(router[i].path, hFunc)
  }
}

// Start listening
server.listen(3000)
