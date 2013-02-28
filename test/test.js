var chai = require('chai')
chai.should()
var Q = require('q')

var avec = require('../index')

describe('avec', function () {

  it('enables array methods on promised arrays', function (done) {
    var arr = Q([1, 2, 3, 4])

    avec(arr)
      .reduce(function (sum, x) {
        return sum = sum + x
      }, 0)
      .then(function (val){
        val.should.equal(10)
      })
      .then(done, done)
  })

  it('chains array methods on promised arrays', function (done) {
    var arr = Q([1, 2, 3, 4])

    avec(arr)
      .filter(function (x) { return x > 2 })
      .map(function (x) { return x + 2 })
      .concat([7, 8])
      .then(function (val) {
        val.should.deep.equal([5,6,7,8])
      })
      .then(done, done)

  })
})