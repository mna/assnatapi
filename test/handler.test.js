var expect = require('expect.js'),
  db = {

  },
  sut = require(process.env.ASSNAT_COV ? '../lib-cov/handler' : '../lib/handler')(db)

describe('handler', function() {
  it('should expose an object', function() {
    expect(sut).to.be.an('object')
  })
})