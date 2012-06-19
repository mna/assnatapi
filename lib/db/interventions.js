/*jshint asi:true, trailing:true*/
var connect = require('./connect'),
  noevil = require('see-no-evil'),
  util = require('../util'),
  allIntrSpec = {
    metaRefId: true,
    deputyId: true
  }

module.exports.get = function(intId, cb) {
  var wrap = noevil({
    error: cb
  })

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('interventions', wrap(function(nul, intsColl) {
      intsColl.findOne({id: intId}, cb)
    }))
  }))
}

module.exports.getAll = function(opts, cb) {
  var wrap = noevil({
    error: cb
  })

  // TODO : Query string options?
  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('interventions', wrap(function(nul, intsColl) {
      intsColl.find(util.normalizeCriteria(opts, allIntrSpec)).toArray(cb)
    }))
  }))
}
