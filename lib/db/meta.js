/*jshint asi:true, trailing:true*/
var connect = require('./connect'),
  noevil = require('see-no-evil'),
  util = require('../util'),
  sessionSpec = {
    session: true
  }

module.exports.getAll = function(opts, cb) {
  var wrap = noevil({
    error: cb
  })

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('meta', wrap(function(nul, metaColl) {
      metaColl.find(util.normalizeCriteria(opts, sessionSpec)).toArray(cb)
    }))
  }))
}

module.exports.get = function(volNo, cb) {
  var wrap = noevil({
    error: cb
  })

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('meta', wrap(function(nul, metaColl) {
      metaColl.findOne({id: volNo}, cb)
    }))
  }))
}
