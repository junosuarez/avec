function avec(promise, continuation) {
  return promise.then(function (value) {
    return continuation.call(value, value)
  })
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