var HttpServer = require('http').Server,
  request = require('request'),
  sinon = require('sinon'),
  sut = require(process.env.ASSNAT_COV ? '../lib-cov/server' : '../lib/server'),
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

  it('should throw if handler does not exist', function() {
    var routes = [{path: '/1', handler: 'invalid'}],
      fn = function() {
        sut.setupRoutes(routes, {})
      }
    expect(fn).to.throwError()
  })

  it('should throw if handler in array does not exist', function() {
    var routes = [{path: '/2', handler: ['invalid', 'load']}],
      fn = function() {
        sut.setupRoutes(routes, {load: function() {}})
      }
    expect(fn).to.throwError()
  })

  it('should allow multiple routes for a path in setupRoutes()', function(done) {
    var routes = [{path:'/a', handler:['loadA', 'getA']}],
      handler = {getA: function(req, res) {
        console.log('get')
        res.send({})
        i++
        return
      },
      loadA: function(req, res, next){
        console.log('load')
        i++
        return next()
      }},
      i = 0

    sut.setupRoutes(routes, handler)
    sut.listen(3000, function() {
      console.log('request')
      request.get('http://localhost:3000/a', function(er, res, body) {
        expect(er).to.be(null)
        expect(res.statusCode).to.be(200)
        expect(i).to.be(2)
        sut.close()
      })
    })
    sut.once('close', function() {
      done()
    })
  })
})
