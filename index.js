function hook(promise, continuation) {
  return promise.then(function (value) {
    return continuation.call(value, value)
  })
}

function avec(promise, continuation) {
  if (continuation) return hook(promise, continuation);
  if (!(this instanceof avec)) {
    return new avec(promise)
  }

  this.then = promise.then.bind(promise)
}

var proto = avec.prototype

function chain(self, fn, args) {
  var promise = self.then(function (val) {
    return fn.apply(val, args)
  })
  self.then = promise.then.bind(promise)
  return self
}

['forEach', 'filter', 'map', 'reduce', 'reduceRight', 'every',
'some', 'concat', 'reverse', 'sort', 'indexOf', 'lastIndexOf',
'shift', 'unshift', 'pop', 'push', 'slice', 'splice'].forEach(function (method) {
  proto[method] = function() {
    return chain(this, Array.prototype[method], arguments)
  }
})

proto.all = proto.every
proto.any = proto.some

proto.length = function () {
  this.then = this.then(function (arr) {
    return arr.length
  }).then
  return this
}

function forEach(promisedArr, iterator) {
  return avec(promisedArr, function (arr) {
    arr.forEach(iterator)
  })
}

function map(promisedArr, fn) {
  return avec(promisedArr, function (arr) {
    return arr.map(fn)
  })
}

module.exports = avec
avec.forEach = forEach
avec.each = forEach
avec.chaque = forEach // ;)
avec.map = map