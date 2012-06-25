var connect = require('./connect'),
  noevil = require('see-no-evil'),
  util = require('../util'),
  CriteriaSpec = {
    meeting: {mapTo: 'meetingId'},
    deputy: {mapTo: 'deputyId'},
    subject: {wrapInRegex: true}
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

module.exports.getAll = function(qs, cb) {
  var wrap = noevil({
    error: cb
  })

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('interventions', wrap(function(nul, intsColl) {
      intsColl.find(
        util.normalizeCriteria(qs, CriteriaSpec),
        util.buildOptionsObject(qs)
      ).toArray(cb)
    }))
  }))
}
