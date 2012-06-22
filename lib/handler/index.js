var util = require('../util')

// Receive the database module as an injected dependency
module.exports = function(db) {
  var bizHandler,
    depHandler,
    assHandler,
    intHandler

  bizHandler = require('./business')(db)
  depHandler = require('./deputies')(db)
  assHandler = require('./assets')
  intHandler = require('./interventions')(db)

  return util.extend(bizHandler, depHandler, assHandler, intHandler)
}
