# avec
some functions for working with promises

## installation

    $ npm install avec

## api

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

## contributors

jden <jason@denizac.org>

## license

MIT. (c) 2013 Agile Diagnosis <hello@agilediagnosis.com> See LICENSE.md