/*jshint asi:true, trailing:true*/

var util = require('../util'),
  fs = require('fs'),
  path = require('path'),
  bizHandler,
  depHandler,
  main = {},
  index

bizHandler = require('./business')
depHandler = require('./deputies')
index = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8')

main.getIndex = function(req, res, next) {
  res.contentType = 'text/html'
  res.write(index)
  res.end()
}

module.exports = util.extend(bizHandler, depHandler, main)
