/*jshint asi:true, trailing:true*/

var restify = require('restify'),
  db = require('./lib/db'),
  noevil = require('see-no-evil'),
  util = require('./lib/util'),
  server

server = restify.createServer({
  version: '0.1.0'
})
server.use(restify.queryParser())

server.get('/deputes', function(req, res, next) {
  var wrap = noevil({
    error: next
  })

  // TODO : Whitelist and normalize query string
  db.deputies.getAll(req.query, wrap(function(nul, deps) {
    res.send(deps)
    return next()
  }))
})

server.get('/deputes/:idDep', function(req, res, next) {
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
})

server.get('/deputes/:idDep/interventions', function(req, res, next) {
  var wrap = noevil({
    error: next
  }), opts


  // TODO : Whitelist and normalize query string
  opts = util.extend({}, req.query, {deputyId: req.params.idDep})

  db.interventions.getAll(opts, wrap(function(nul, ints) {
    res.send(ints)
    return next()
  }))
})

server.get('/deputes/:idDep/interventions/:idInt', function(req, res, next) {
  var wrap = noevil({
    error: next
  })

  db.interventions.get(req.params.idInt, wrap(function(nul, intr) {
    if (intr) {
      res.send(intr)
    } else {
      res.send(new restify.ResourceNotFoundError('The requested ID does not exist.'))
    }
    return next()
  }))
})

server.listen(3000)
