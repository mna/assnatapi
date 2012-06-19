/*jshint asi:true, trailing:true*/
var connect = require('./connect'),
  noevil = require('see-no-evil')

module.exports.get = function(depId, cb) {
  var wrap = noevil({
    error: cb
  })

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('deputies', wrap(function(nul, depsColl) {
      depsColl.findOne({id: depId}, cb)
    }))
  }))
}

module.exports.getAll = function(opts, cb) {
  var wrap = noevil({
    error: cb
  }), crit

  if (opts && typeof opts.active !== 'undefined') {
    crit = {
      isActive: (opts.active === 'true' || opts.active === '1')
    }
  }

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('deputies', wrap(function(nul, depsColl) {
      depsColl.find(crit).toArray(cb)
    }))
  }))
}
