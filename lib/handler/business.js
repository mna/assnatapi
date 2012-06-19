/*jshint asi:true, trailing:true*/

var noevil = require('see-no-evil'),
  restify = require('restify'),
  db = require('../db'),
  util = require('../util'),
  common = require('./common'),
  handler = {}

/*
** Meta object:
** - status : the status of the parliament business day ("Préliminaire", "Finale" is definitive)
** - session : the parliament session (LL.SS : législative.session)
** - day : the day of the week of the business, in French
** - date : the date of the business
** - refId : the reference ID of the business, in Vol.No format
** - interventionsPath : the path to the interventions of this business day
*/

function augmentMeta(meta) {
  meta.interventionsPath = '/travaux/' + meta.session + '/' + meta.refId + '/interventions'
}

handler.getMetas = function(req, res, next) {
  var wrap = noevil({
    error: next
  }), opts = {
    session: req.query.session
  }

  db.meta.getAll(opts, wrap(function(nul, metas) {
    metas.forEach(augmentMeta)
    res.send(metas)
    return next()
  }))
}

handler.loadMeta = function(req, res, next) {
  var wrap = noevil({
    error: next
  })

  db.meta.get(req.params.idMeta, wrap(function(nul, meta) {
    if (meta) {
      req.params.meta = meta
      return next()
    } else {
      res.send(new restify.ResourceNotFoundError('L\'identifiant de travail demandé n\'existe pas.'))
    }
  }))
}

handler.getMeta = function(req, res, next) {
  augmentMeta(req.params.meta)
  res.send(req.params.meta)
  return next()
}

handler.getMetaInterventions = function(req, res, next) {
  var wrap = noevil({
    error: next
  }), opts = {
    metaRefId: req.params.idMeta
  }

  db.interventions.getAll(opts, wrap(function(nul, ints) {
    ints.forEach(common.augmentIntervention)
    res.send(ints)
    return next()
  }))
}

handler.getMetaIntervention = function(req, res, next) {
  var wrap = noevil({
    error: next
  })

  db.interventions.get(req.params.idInt, wrap(function(nul, intr) {
    if (intr && intr.metaRefId === req.params.idMeta) {
      common.augmentIntervention(intr)
      res.send(intr)
    } else {
      if (intr) {
        res.send(new restify.ResourceNotFoundError('L\'identifiant d\'intervention demandé n\'existe pas pour le travail spécifiée.'))
      } else {
        res.send(new restify.ResourceNotFoundError('L\'identifiant d\'intervention demandé n\'existe pas.'))
      }
    }
    return next()
  }))
}

module.exports = handler
