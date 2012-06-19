/*jshint asi:true, trailing:true*/

var noevil = require('see-no-evil'),
  restify = require('restify'),
  db = require('../db'),
  util = require('../util'),
  handler = {}

handler.getDeputies = function(req, res, next){
  var wrap = noevil({
    error: next
  })

  // TODO : Whitelist and normalize query string
  db.deputies.getAll(req.query, wrap(function(nul, deps) {
    res.send(deps)
    return next()
  }))
}

handler.getDeputy = function(req, res, next) {
  var wrap = noevil({
    error: next
  })

  db.deputies.get(req.params.idDep, wrap(function(nul, dep) {
    if (dep) {
      res.send(dep)
    } else {
      res.send(new restify.ResourceNotFoundError('The requested ID does not exist.'))
    }
    return next()
  }))
}

handler.getDeputyInterventions = function(req, res, next) {
  var wrap = noevil({
    error: next
  }), opts

  // TODO : Whitelist and normalize query string
  opts = util.extend({}, req.query, {deputyId: req.params.idDep})

  db.interventions.getAll(opts, wrap(function(nul, ints) {
    res.send(ints)
    return next()
  }))
}

handler.getDeputyIntervention = function(req, res, next) {
  var wrap = noevil({
    error: next
  })

  db.interventions.get(req.params.idInt, wrap(function(nul, intr) {
    if (intr && intr.deputyId === req.params.idDep) {
      res.send(intr)
    } else {
      if (intr) {
        res.send(new restify.ResourceNotFoundError('The requested ID does not exist for this deputy.'))
      } else {
        res.send(new restify.ResourceNotFoundError('The requested ID does not exist.'))
      }
    }
    return next()
  }))
}

module.exports = handler
