/*jshint asi:true, trailing:true*/

var restify = require('restify'),
  server

server = restify.createServer({
  version: '0.1.0'
})
server.get('/deputes', function(req, res, next) {

})
server.listen(3000)
