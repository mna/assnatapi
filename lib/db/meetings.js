var connect = require('./connect'),
  noevil = require('see-no-evil'),
  util = require('../util'),
  CriteriaSpec = {
    session: true
  }

module.exports.getAll = function(qs, cb) {
  var wrap = noevil({
    error: cb
  })

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('meetings', wrap(function(nul, meetColl) {
      meetColl.find(
        util.normalizeCriteria(qs, CriteriaSpec),
        util.buildOptionsObject(qs)
      ).toArray(cb)
    }))
  }))
}

module.exports.get = function(meetingId, cb) {
  var wrap = noevil({
    error: cb
  })

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('meetings', wrap(function(nul, meetColl) {
      meetColl.findOne({id: meetingId}, cb)
    }))
  }))
}
