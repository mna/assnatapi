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
  })

  db.meta.getAll(null, wrap(function(nul, metas) {
    metas.forEach(augmentMeta)
    res.send(metas)
    return next()
  }))
}

handler.getMetasForSession = function(req, res, next) {
  var wrap = noevil({
    error: next
  }), crit = {
    session: req.params.idSsn
  }

  db.meta.getAll(crit, wrap(function(nul, metas) {
    metas.forEach(augmentMeta)
    res.send(metas)
    return next()
  }))
}

handler.loadMeta = function(req, res, next) {
  var wrap = noevil({
    error: next
  })

  db.meta.get(req.params.volNo, wrap(function(nul, meta) {
    if (meta && meta.session === req.params.idSsn) {
      req.params.meta = meta
      return next()
    } else {
      if (meta) {
        res.send(new restify.ResourceNotFoundError('L\'identifiant demandé n\'existe pas pour la session parlementaire spécifiée.'))
      } else {
        res.send(new restify.ResourceNotFoundError('L\'identifiant demandé n\'existe pas.'))
      }
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
    metaRefId: req.params.volNo
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
    if (intr && intr.metaRefId === req.params.volNo) {
      common.augmentIntervention(intr)
      res.send(intr)
    } else {
      if (intr) {
        res.send(new restify.ResourceNotFoundError('L\'identifiant demandé n\'existe pas pour la journée de travaux spécifiée.'))
      } else {
        res.send(new restify.ResourceNotFoundError('L\'identifiant demandé n\'existe pas.'))
      }
    }
    return next()
  }))
}

module.exports = handler
