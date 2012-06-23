var expect = require('expect.js'),
  db = require('./db.mock'),
  sut = require(process.env.ASSNAT_COV ? '../lib-cov/handler' : '../lib/handler')(db),
  restify = require('restify'),
  noop = function() {}

describe('handler', function() {
  it('should expose an object', function() {
    expect(sut).to.be.an('object')
  })

  describe('.loadDeputy', function() {
    it('should be a function', function() {
      expect(sut.loadDeputy).to.be.a('function')
    })

    it('should set the deputy object on req.params.dep', function() {
      var req = {},
        res = {}

      req.params = {
        idDep: 'dubourg-emmanuel-363'
      }

      sut.loadDeputy(req, res, function() {
        expect(req.params.dep).to.be.an('object')
        expect(req.params.dep.id).to.be('dubourg-emmanuel-363')
      })
    })

    it('should return a 404 error if deputy is invalid', function() {
      var req = {},
        res = {}

      req.params = {
        idDep: 'toto'
      }
      res.send = function(er) {
        expect(er).to.be.an(restify.ResourceNotFoundError)
        expect(er.message).to.contain('existe pas')
        expect(er.statusCode).to.be(404)
      }
      sut.loadDeputy(req, res)
    })
  })

  describe('.getDeputy', function() {
    it('should be a function', function() {
      expect(sut.getDeputy).to.be.a('function')
    })

    it('should return an augmented deputy', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idDep: 'dubourg-emmanuel-363'
      }

      res.send = function(dep) {
        expect(dep).to.be.an('object')
        expect(dep.id).to.be('dubourg-emmanuel-363')
        expect(dep).to.have.key('interventionsPath')
        expect(dep.interventionsPath).to.be('/deputies/dubourg-emmanuel-363/interventions')
      }

      // First call loadDeputy
      sut.loadDeputy(req, res, function() {
        // Then call getDeputy
        sut.getDeputy(req, res, next)
      })
    })
  })
})
