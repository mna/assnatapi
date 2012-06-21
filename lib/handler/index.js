/*jshint asi:true, trailing:true*/

var util = require('../util')

// Receive the database module as an injected dependency
module.exports = function(db) {
  var bizHandler,
    depHandler,
    assHandler

  bizHandler = require('./business')(db)
  depHandler = require('./deputies')(db)
  assHandler = require('./assets')

  return util.extend(bizHandler, depHandler, assHandler)
}
