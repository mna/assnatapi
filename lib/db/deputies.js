var connect = require('./connect'),
  util = require('../util'),
  noevil = require('see-no-evil'),

  // The criteria specifications for getAll
  CriteriaSpec = {
    active: {isBoolean: true, mapTo: 'isActive'},
    a: {isBoolean: true, mapTo: 'isActive'},
    inactive: {isBoolean: true, mapTo: 'isActive', mapReverseValue: true},
    i: {isBoolean: true, mapTo: 'isActive', mapReverseValue: true},
    district: {wrapInRegex: true},
    party: {wrapInRegex: true}
  }

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

module.exports.getAll = function(qs, cb) {
  var wrap = noevil({
    error: cb
  })

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('deputies', wrap(function(nul, depsColl) {
      depsColl.find(
        util.normalizeCriteria(qs, CriteriaSpec),
        util.buildOptionsObject(qs)
      ).toArray(cb)
    }))
  }))
}
