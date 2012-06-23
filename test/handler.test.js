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

  describe('.getDeputies', function() {
    it('should be a function', function() {
      expect(sut.getDeputies).to.be.a('function')
    })

    it('should return all deputies, augmented', function() {
      var req = {},
        res = {},
        next = noop

      res.send = function(deps) {
        expect(deps).to.be.an('array')
        expect(deps.length).to.be(10)
        expect(deps.every(function(val) {
          return val.interventionsPath === '/deputies/' + val.id + '/interventions'
        })).to.be.ok()
      }
      sut.getDeputies(req, res, next)
    })
  })

  describe('.getInterventions', function() {
    it('should be a function', function() {
      expect(sut.getInterventions).to.be.a('function')
    })

    it('should return all interventions, augmented', function() {
      var req = {},
        res = {},
        next = noop

      res.send = function(ints) {
        expect(ints).to.be.an('array')
        expect(ints.length).to.be(9)
        expect(ints.every(function(val) {
          return val.meetingPath && (val.nextInterventionPath || val.prevInterventionPath)
        })).to.be.ok()
      }
      sut.getInterventions(req, res, next)
    })
  })

  describe('.loadIntervention', function() {
    it('should be a function', function() {
      expect(sut.loadIntervention).to.be.a('function')
    })

    it('should set the intervention object on req.params.intr', function() {
      var req = {},
        res = {}

      req.params = {
        idInt: '42.119.46'
      }

      sut.loadIntervention(req, res, function() {
        expect(req.params.intr).to.be.an('object')
        expect(req.params.intr.id).to.be('42.119.46')
      })
    })

    it('should return a 404 error if intervention is invalid', function() {
      var req = {},
        res = {}

      req.params = {
        idInt: 'toto'
      }
      res.send = function(er) {
        expect(er).to.be.an(restify.ResourceNotFoundError)
        expect(er.message).to.contain('existe pas')
        expect(er.statusCode).to.be(404)
      }
      sut.loadIntervention(req, res)
    })
  })

  describe('.getIntervention', function() {
    it('should be a function', function() {
      expect(sut.getIntervention).to.be.a('function')
    })

    it('should return an augmented intervention', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idInt: '42.118.129'
      }

      res.send = function(intr) {
        expect(intr).to.be.an('object')
        expect(intr.id).to.be('42.118.129')
        expect(intr).to.have.key('meetingPath')
        expect(intr).to.have.key('deputyPath')
      }

      // First call loadIntervention
      sut.loadIntervention(req, res, function() {
        // Then call getIntervention
        sut.getIntervention(req, res, next)
      })
    })
  })

  describe('.getMeetings', function() {
    it('should be a function', function() {
      expect(sut.getMeetings).to.be.a('function')
    })

    it('should return all meetings, augmented', function() {
      var req = {},
        res = {},
        next = noop

      res.send = function(meets) {
        expect(meets).to.be.an('array')
        expect(meets.length).to.be(8)
        expect(meets.every(function(val) {
          return val.interventionsPath === '/meetings/' + val.id + '/interventions'
        })).to.be.ok()
      }
      sut.getMeetings(req, res, next)
    })
  })

  describe('.loadMeeting', function() {
    it('should be a function', function() {
      expect(sut.loadMeeting).to.be.a('function')
    })

    it('should set the meeting object on req.params.meet', function() {
      var req = {},
        res = {}

      req.params = {
        idMeeting: '42.121'
      }

      sut.loadMeeting(req, res, function() {
        expect(req.params.meet).to.be.an('object')
        expect(req.params.meet.id).to.be('42.121')
      })
    })

    it('should return a 404 error if meeting is invalid', function() {
      var req = {},
        res = {}

      req.params = {
        idMeeting: 'toto'
      }
      res.send = function(er) {
        expect(er).to.be.an(restify.ResourceNotFoundError)
        expect(er.message).to.contain('existe pas')
        expect(er.statusCode).to.be(404)
      }
      sut.loadMeeting(req, res)
    })
  })

  describe('.getMeeting', function() {
    it('should be a function', function() {
      expect(sut.getMeeting).to.be.a('function')
    })

    it('should return an augmented meeting', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idMeeting: '42.123'
      }

      res.send = function(meet) {
        expect(meet).to.be.an('object')
        expect(meet.id).to.be('42.123')
        expect(meet).to.have.key('interventionsPath')
        expect(meet.interventionsPath).to.be('/meetings/42.123/interventions')
      }

      // First call loadMeeting
      sut.loadMeeting(req, res, function() {
        // Then call getMeeting
        sut.getMeeting(req, res, next)
      })
    })
  })

  describe('.getDeputyInterventions', function() {
    it('should be a function', function() {
      expect(sut.getDeputyInterventions).to.be.a('function')
    })

    it('should return only the interventions of the deputy', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idDep: 'charest-jean-525'
      }
      req.query = {}

      res.send = function(ints) {
        expect(ints).to.be.an('array')
        expect(ints.length).to.be(1)
        expect(ints.every(function(val) {
          return val.deputyPath === '/deputies/charest-jean-525'
        })).to.be.ok()
      }

      sut.getDeputyInterventions(req, res, next)
    })
  })

  describe('.getDeputyIntervention', function() {
    it('should be a function', function() {
      expect(sut.getDeputyIntervention).to.be.a('function')
    })

    it('should return the requested deputy intervention', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idDep: 'james-yolande-49',
        idInt: '42.118.129'
      }
      res.send = function(intr) {
        expect(intr).to.be.an('object')
        expect(intr.id).to.be('42.118.129')
        expect(intr.deputyId).to.be('james-yolande-49')
        expect(intr).to.have.key('meetingPath')
        expect(intr).to.have.key('deputyPath')
        expect(intr.deputyPath).to.be('/deputies/james-yolande-49')
      }

      sut.getDeputyIntervention(req, res, next)
    })

    it('should return a 404 error if intervention is invalid', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idDep: 'james-yolande-49',
        idInt: 'toto'
      }
      res.send = function(er) {
        expect(er).to.be.an(restify.ResourceNotFoundError)
        expect(er.message).to.contain('existe pas')
        expect(er.statusCode).to.be(404)
      }
      sut.getDeputyIntervention(req, res, next)
    })

    it('should return a 404 error if intervention and deputy do not fit', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idDep: 'james-yolande-49',
        idInt: '42.118.127'
      }
      res.send = function(er) {
        expect(er).to.be.an(restify.ResourceNotFoundError)
        expect(er.message).to.contain('existe pas')
        expect(er.statusCode).to.be(404)
      }
      sut.getDeputyIntervention(req, res, next)
    })
  })

  describe('.getMeetingInterventions', function() {
    it('should be a function', function() {
      expect(sut.getMeetingInterventions).to.be.a('function')
    })

    it('should return only the interventions of the meeting', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idMeeting: '42.117'
      }
      req.query = {}

      res.send = function(ints) {
        expect(ints).to.be.an('array')
        expect(ints.length).to.be(3)
        expect(ints.every(function(val) {
          return val.meetingPath === '/meetings/42.117'
        })).to.be.ok()
      }

      sut.getMeetingInterventions(req, res, next)
    })
  })

  describe('.getMeetingIntervention', function() {
    it('should be a function', function() {
      expect(sut.getMeetingIntervention).to.be.a('function')
    })

    it('should return the requested meeting intervention', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idMeeting: '42.118',
        idInt: '42.118.129'
      }
      res.send = function(intr) {
        expect(intr).to.be.an('object')
        expect(intr.id).to.be('42.118.129')
        expect(intr.meetingId).to.be('42.118')
        expect(intr).to.have.key('meetingPath')
        expect(intr).to.have.key('deputyPath')
        expect(intr.meetingPath).to.be('/meetings/42.118')
      }

      sut.getMeetingIntervention(req, res, next)
    })

    it('should return a 404 error if intervention is invalid', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idMeeting: '42.122',
        idInt: 'toto'
      }
      res.send = function(er) {
        expect(er).to.be.an(restify.ResourceNotFoundError)
        expect(er.message).to.contain('existe pas')
        expect(er.statusCode).to.be(404)
      }
      sut.getMeetingIntervention(req, res, next)
    })

    it('should return a 404 error if intervention and meeting do not fit', function() {
      var req = {},
        res = {},
        next = noop

      req.params = {
        idMeeting: '42.122',
        idInt: '42.118.127'
      }
      res.send = function(er) {
        expect(er).to.be.an(restify.ResourceNotFoundError)
        expect(er.message).to.contain('existe pas')
        expect(er.statusCode).to.be(404)
      }
      sut.getMeetingIntervention(req, res, next)
    })
  })
})
