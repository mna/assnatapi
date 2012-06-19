/*jshint asi:true, trailing:true*/

var util = require('../util'),
  bizHandler,
  depHandler

bizHandler = require('./business')
depHandler = require('./deputies')

module.exports = util.extend(bizHandler, depHandler)
