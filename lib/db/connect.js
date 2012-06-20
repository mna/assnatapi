/*jshint asi:true, trailing:true*/

var mongodb = require("mongodb"),
  noevil = require('see-no-evil'),
  mongoserver = new mongodb.Server(process.env.MONGO_HOST, parseInt(process.env.MONGO_PORT, 10)),
  db_connector = new mongodb.Db(process.env.MONGO_DB, mongoserver),
  db

module.exports.ensureConnected = function(cb) {
  var wrap = noevil({
    error: cb
  })

  if (!db) {
    db_connector.open(wrap(function(nul, theDb) {
      db = theDb
      console.log('connected, authenticating...')
      db.authenticate(process.env.MONGO_USER_R, process.env.MONGO_PWD_R, wrap(function(nul, ok) {
        console.log('ok? ' + ok)
        cb(null, db)
      }))
    }))
  } else {
    cb(null, db)
  }
}

module.exports.end = function() {
  if (db) {
    console.log('closing db...')
    db.close()
  }
}
