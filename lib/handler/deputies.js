/*jshint asi:true, trailing:true*/

var noevil = require('see-no-evil'),
  restify = require('restify'),
  db = require('../db'),
  util = require('../util'),
  common = require('./common'),
  handler = {}

/*
** Deputy object:
** - url : the absolute URL to the deputy's page on assnat
** - id : the unique identifier of the deputy (currently, the name_id part of the URL)
** - lastName : the deputy's last name
** - firstName : the deputy's first name
** - email : the publicly displayed email address of the deputy [optional]
** - district : the district of the deputy
** - party : the name of the party of the deputy (Indépendant if none)
** - title : M. or Mme
** - gender : m[ale] or f[emale]
** - picture : for now, the absolute url of the small picture on assnat
** - isActive : whether or not this deputy is currently active
** - interventionsPath : the path of this deputy's interventions
*/

function augmentDeputy(dep) {
  // Add the URL to his/her interventions
  dep.interventionsPath = '/deputes/' + dep.id + '/interventions'
}

handler.getDeputies = function(req, res, next){
  var wrap = noevil({
    error: next
  })

  db.deputies.getAll(req.query, wrap(function(nul, deps) {
    deps.forEach(augmentDeputy)
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
      augmentDeputy(dep)
      res.send(dep)
    } else {
      res.send(new restify.ResourceNotFoundError('L\'identifiant de député demandé n\'existe pas.'))
    }
    return next()
  }))
}

handler.getDeputyInterventions = function(req, res, next) {
  var wrap = noevil({
    error: next
  }), opts

  opts = util.extend({}, req.query, {deputyId: req.params.idDep})

  db.interventions.getAll(opts, wrap(function(nul, ints) {
    ints.forEach(common.augmentIntervention)
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
      common.augmentIntervention(intr)
      res.send(intr)
    } else {
      if (intr) {
        res.send(new restify.ResourceNotFoundError('L\'identifiant d\'intervention demandé n\'existe pas pour le député spécifié.'))
      } else {
        res.send(new restify.ResourceNotFoundError('L\'identifiant d\'intervention demandé n\'existe pas.'))
      }
    }
    return next()
  }))
}

module.exports = handler
