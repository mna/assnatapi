/*jshint asi:true, trailing:true*/

var noevil = require('see-no-evil'),
  restify = require('restify'),
  db = require('../db'),
  util = require('../util'),
  handler = {}

handler.getMetas = function(req, res, next) {
  var wrap = noevil({
    error: next
  })

  db.meta.getAll(null, wrap(function(nul, metas) {
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
        res.send(new restify.ResourceNotFoundError('The requested ID does not exist for this session.'))
      } else {
        res.send(new restify.ResourceNotFoundError('The requested ID does not exist.'))
      }
    }
  }))
}

handler.getMeta = function(req, res, next) {
  res.send(req.params.meta)
  return next()
}


handler.getMetaInterventions = function(req, res, next) {
  var wrap = noevil({
    error: next
  }), opts

  // TODO : Whitelist and normalize query string
  opts = util.extend({}, req.query, {metaRefId: req.params.volNo})

  db.interventions.getAll(opts, wrap(function(nul, ints) {
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
      res.send(intr)
    } else {
      if (intr) {
        res.send(new restify.ResourceNotFoundError('The requested ID does not exist for this business day.'))
      } else {
        res.send(new restify.ResourceNotFoundError('The requested ID does not exist.'))
      }
    }
    return next()
  }))
}

module.exports = handler
