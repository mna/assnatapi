/*globals describe, it, before, beforeAll, after, afterAll*/
/*jshint asi:true, trailing:true*/

var HttpServer = require('http').Server,
  request = require('request'),
  sinon = require('sinon'),
  sut = require(process.env.COV ? '../lib-cov/server' : '../lib/server'),
  expect = require('expect.js')

describe('server', function() {
  it('should contain an instance of a HTTP server', function() {
    expect(sut.server).to.be.a(HttpServer)
  })

  it('should expose a listen() method', function() {
    expect(sut.listen).to.be.a('function')
  })

  it('should expose a setupRoutes() method', function() {
    expect(sut.setupRoutes).to.be.a('function')
  })

  it('should listen to requests on #listen()', function(done) {
    sut.listen(3000, function() {
      request.get('http://localhost:3000', function(er, res, body) {
        // No route defined, so status code should be 404
        expect(er).to.be(null)
        expect(res.statusCode).to.be(404)
        sut.close()
      })
    })
    sut.once('close', function() {
      done()
    })
  })

  it('should respond to routes defined by setupRoutes()', function(done) {
    var routes = [{path:'/', handler:'get'}],
      handler = {get: function(req, res) {
        res.send({})
      }}

    sut.setupRoutes(routes, handler)
    sut.listen(3000, function() {
      request.get('http://localhost:3000', function(er, res, body) {
        expect(er).to.be(null)
        expect(res.statusCode).to.be(200)
        sut.close()
      })
    })
    sut.once('close', function() {
      done()
    })
  })
})
