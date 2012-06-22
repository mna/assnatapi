var sut = require(process.env.ASSNAT_COV ? '../lib-cov/router' : '../lib/router'),
  expect = require('expect.js')

describe('router', function() {
  it('should expose an array', function() {
    expect(sut).to.be.an(Array)
  })

  it('should have a / route', function() {
    expect(sut.some(function(val) {
      return val.path === '/'
    })).to.be.ok()
  })

  it('should have a /deputies route', function() {
    expect(sut.some(function(val) {
      return val.path === '/deputies'
    })).to.be.ok()
  })

  it('should have a /deputies/:idDep route', function() {
    expect(sut.some(function(val) {
      return val.path === '/deputies/:idDep'
    })).to.be.ok()
  })

  it('should have a /deputies/:idDep/interventions route', function() {
    expect(sut.some(function(val) {
      return val.path === '/deputies/:idDep/interventions'
    })).to.be.ok()
  })

  it('should have a /deputies/:idDep/interventions/:idInt route', function() {
    expect(sut.some(function(val) {
      return val.path === '/deputies/:idDep/interventions/:idInt'
    })).to.be.ok()
  })

  it('should have a /meetings route', function() {
    expect(sut.some(function(val) {
      return val.path === '/meetings'
    })).to.be.ok()
  })

  it('should have a /meetings/:idMeeting route', function() {
    expect(sut.some(function(val) {
      return val.path === '/meetings/:idMeeting'
    })).to.be.ok()
  })

  it('should have a /meetings/:idMeeting/interventions route', function() {
    expect(sut.some(function(val) {
      return val.path === '/meetings/:idMeeting/interventions'
    })).to.be.ok()
  })

  it('should have a /meetings/:idMeeting/interventions/:idInt route', function() {
    expect(sut.some(function(val) {
      return val.path === '/meetings/:idMeeting/interventions/:idInt'
    })).to.be.ok()
  })

  it('should have a /interventions route', function() {
    expect(sut.some(function(val) {
      return val.path === '/interventions'
    })).to.be.ok()
  })

  it('should have a /interventions/:idInt route', function() {
    expect(sut.some(function(val) {
      return val.path === '/interventions/:idInt'
    })).to.be.ok()
  })
})
