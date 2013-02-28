# avec
Eventual ES5 array operations using promises

## installation

    $ npm install avec

## usage

Think of it like using native ES5 Array.prototype methods on Promised arrays.

    var documents = getPromisedArrayOfStuffFromDB()
    avec(documents).forEach(function (document) {
      console.dir(document)
    })

    avec(documents)
      .filter(x)
      .map(x)
      .reduce(x)
      .then(function (aggregate) {
        console.log('we can string things together')
        // the neat thing about promises is that there's no `value()`
        // or finalizer method to call, since each step of the way
        // returns a valid promises/a `thenable` promise.
      })

## api

### `avec(promisedCollection)`

Begins a promise chain.

### Supported Array.prototype methods:

`forEach`, `filter`, `map`, `reduce`, `reduceRight`, `every`,
`some`, `concat`, `reverse`, `sort`, `indexOf`, `lastIndexOf`,
`shift`, `unshift`, `pop`, `push`, `slice`, `splice`

The return value for each of these is the a Promise of whatever the return value would be on a synchronous array.

### `avec(promise, continuation)`

like calling `promise.then(continuation)`, except `continuation`'s `this` is also set to the promise value. This allows for slightly more fluid syntax:

    var document = getDocumentAsPromise(5)

    avec(document, function () {
      console.log('We got ' + this.title)
    })

This is pretty much an ergonomic function I wanted when writing scripts.

### `avec.each(promisedArray, iterator)`, alias `avec.chaque`, `avec.forEach`

Like calling `promise.then(function (val) { val.forEach(iterator) })`, Use when you're expecting an array value that you want to iterate over.

### `avec.map(promisedArray, scalarFunction`

Like calling `promise.then(function (val) { return val.map(scalarFunction) })`. Returns a Promise<Array>

## running the unit tests

In package root directory:

    $ npm install
    $ npm test

## contributors

jden <jason@denizac.org>

## license

MIT. (c) 2013 Agile Diagnosis <hello@agilediagnosis.com> See LICENSE.md