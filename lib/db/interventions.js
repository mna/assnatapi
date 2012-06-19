/*jshint asi:true, trailing:true*/
var connect = require('./connect'),
  noevil = require('see-no-evil')

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
  }), crit


  if (opts && typeof opts.parti !== 'undefined') {
    crit = {
      party: opts.parti
    }
  }

  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('interventions', wrap(function(nul, intsColl) {
      intsColl.find(opts).toArray(cb)
    }))
  }))
}
