/*jshint asi:true, trailing:true*/
var connect = require('./connect'),
  noevil = require('see-no-evil')

module.exports.getAll = function(opts, cb) {
  var wrap = noevil({
    error: cb
  })

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('meta', wrap(function(nul, metaColl) {
      metaColl.find(opts).toArray(cb)
    }))
  }))
}

module.exports.get = function(volNo, cb) {
  var wrap = noevil({
    error: cb
  })

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('meta', wrap(function(nul, metaColl) {
      metaColl.findOne({refId: volNo}, cb)
    }))
  }))
}
