/*jshint asi:true, trailing:true*/

var bizRoutes = require('./business'),
  depRoutes = require('./deputies'),
  main = []

main.push({
  path: '/',
  handler: 'getIndex'
})

module.exports = bizRoutes.concat(depRoutes.concat(main))
