var sut = require(process.env.COV ? '../lib-cov/util' : '../lib/util'),
  expect = require('expect.js')

describe('util', function() {
  
  describe('.extend', function() {
    it('should be a function', function() {
      expect(sut.extend).to.be.a('function')
    })

    it('should return null if the destination object is null', function() {
      expect(sut.extend(null, {a:true})).to.be(null)
    })

    it('should not alter the destination if the source is null', function() {
      expect(sut.extend({}, null)).to.be.eql({})
    })

    it('should copy properties of the source to the destination', function() {
      var dest = sut.extend({}, {a: true})
      expect(dest).to.have.key('a')
      expect(dest.a).to.be.ok()
    })

    it('should copy properties of multiple sources to the destination', function() {
      var dest = sut.extend({}, {a: true}, {b: 1}, {c: 'a'})
      expect(dest).to.have.key('a')
      expect(dest).to.have.key('b')
      expect(dest).to.have.key('c')
      expect(dest.a).to.be.ok()
      expect(dest.b).to.be(1)
      expect(dest.c).to.be('a')
    })

    it('should override an existing properties with the latest source', function() {
      var dest = sut.extend({a: 'a'}, {a: 'b'}, {a: 'c'})
      expect(dest).to.have.key('a')
      expect(dest.a).to.be('c')
    })
  })

  describe('.normalizeCriteria', function() {
    it('should be a function', function() {
      expect(sut.normalizeCriteria).to.be.a('function')
    })

    it('should return null if criteria is null', function() {
      expect(sut.normalizeCriteria(null)).to.be(null)
    })

    it('should return null if spec is null', function() {
      expect(sut.normalizeCriteria({}, null)).to.be(null)
    })

    it('should return empty object if spec is empty', function() {
      expect(sut.normalizeCriteria({a: true, b: false}, {})).to.be.eql({})
    })

    it('should return properties set to true in spec, ignoring others', function() {
      expect(sut.normalizeCriteria({a: true, b: false}, {b: true})).to.be.eql({b: false})
    })

    it('should return a property as true if it is "1"', function() {
      expect(sut.normalizeCriteria({a: '1'}, {a: {isBoolean: true}})).to.be.eql({a: true})
    })

    it('should return a property as true if it is "true"', function() {
      expect(sut.normalizeCriteria({a: 'true'}, {a: {isBoolean: true}})).to.be.eql({a: true})
    })

    it('should return a property as false if it is "2"', function() {
      expect(sut.normalizeCriteria({a: '2'}, {a: {isBoolean: true}})).to.be.eql({a: false})
    })

    it('should return a property as true if it is "2" and trueValues contains "2"', function() {
      expect(sut.normalizeCriteria({a: '2'}, {a: {isBoolean: true, trueValues: ["2"]}})).to.be.eql({a: true})
    })

    it('should return a property as false if it is "true" and **falseValues** contains "true"', function() {
      expect(sut.normalizeCriteria({a: 'true'}, {a: {isBoolean: true, falseValues: ["true"]}})).to.be.eql({a: false})
    })

    it('should return an object with the mapTo property', function() {
      expect(sut.normalizeCriteria({a: 'toto'}, {a: {mapTo: 'b'}})).to.be.eql({b: 'toto'})
    })

    it('should return an object with the mapTo property and value reversed', function() {
      expect(sut.normalizeCriteria({a: '1'}, {a: {mapTo: 'b', isBoolean: true, mapReverseValue: true}})).to.be.eql({b: false})
    })

    it('should return an object with the mapTo property and value not reversed', function() {
      expect(sut.normalizeCriteria({a: '1'}, {a: {mapTo: 'b', isBoolean: true, mapReverseValue: false}})).to.be.eql({b: true})
    })
  })
})
