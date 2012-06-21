/*jshint asi:true, trailing:true*/

var noevil = require('see-no-evil'),
  restify = require('restify')

module.exports = function(db) {
  var handler = {},
    common = require('./common')

  handler.getInterventions = function(req, res, next){
    var wrap = noevil({
      error: next
    })

    db.interventions.getAll(req.query, wrap(function(nul, ints) {
      ints.forEach(common.augmentIntervention)
      res.send(ints)
      return next()
    }))
  }

  handler.loadIntervention = function(req, res, next) {
    var wrap = noevil({
      error: next
    })

    db.interventions.get(req.params.idInt, wrap(function(nul, intr) {
      if (intr) {
        req.params.intr = intr
        return next()
      } else {
        res.send(new restify.ResourceNotFoundError('L\'identifiant d\'intervention demandé n\'existe pas.'))
      }
    }))
  }

  handler.getIntervention = function(req, res, next) {
    common.augmentIntervention(req.params.intr)
    res.send(req.params.intr)
    return next()
  }

  return handler
}
