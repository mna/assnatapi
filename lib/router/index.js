/*jshint asi:true, trailing:true*/

var bizRoutes = require('./business'),
  depRoutes = require('./deputies'),
  assRoutes = require('./assets')

// Combine all routes
module.exports = bizRoutes.concat(depRoutes.concat(assRoutes))
