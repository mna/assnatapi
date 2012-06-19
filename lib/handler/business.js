/*jshint asi:true, trailing:true*/

var noevil = require('see-no-evil'),
  restify = require('restify'),
  db = require('../db'),
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

handler.getMeta = function(req, res, next) {
  var wrap = noevil({
    error: next
  })

  db.meta.get(req.params.volNo, wrap(function(nul, meta) {
    if (meta && meta.session === req.params.idSsn) {
      res.send(meta)
    } else {
      if (meta) {
        res.send(new restify.ResourceNotFoundError('The requested ID does not exist for this session.'))
      } else {
        res.send(new restify.ResourceNotFoundError('The requested ID does not exist.'))
      }
    }
    return next()
  }))
}

module.exports = handler
