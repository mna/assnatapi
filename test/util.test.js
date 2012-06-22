var sut = require(process.env.COV ? '../lib-cov/util' : '../lib/util'),
  expect = require('expect.js')

describe('util', function() {
  
  describe('.extend', function() {
    it('should be a function', function() {
      expect(sut.extend).to.be.a('function')
    })

    it('should return null if the destination object is null', function() {
      expect(sut.extend(null)).to.be(null)
    })

    it('should copy properties of the source to the destination', function() {
      var dest = sut.extend({}, {a: true})
      expect(dest).to.have.key('a')
      expect(dest.a).to.be.ok()
    })
  })
})