/*jshint asi:true, trailing:true*/

var routes = []

routes.push({
  path: '/',
  handler: 'serveIndex'
})

routes.push({
  path: /^\/(index\.html|\w+\.css|\w+\.js)$/,
  handler: 'serveFile'
})

module.exports = routes
