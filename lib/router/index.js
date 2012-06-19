/*jshint asi:true, trailing:true*/

var bizRoutes = require('./business'),
  depRoutes = require('./deputies')

module.exports = bizRoutes.concat(depRoutes)
