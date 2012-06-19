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


  if (opts && typeof opts.parti !== 'undefined') {
    crit = {
      party: opts.parti
    }
  }

  console.log('crit : ')
  console.dir(crit)
  connect.ensureConnected(wrap(function(nul, db) {
    db.collection('interventions', wrap(function(nul, intsColl) {
      intsColl.find(opts).toArray(cb)
    }))
  }))
}
