# call-parallel [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url]

[travis-image]: https://travis-ci.org/anthony-kenikh/call-parallel.svg
[travis-url]: https://travis-ci.org/anthony-kenikh/call-parallel
[npm-image]: https://img.shields.io/npm/v/call-parallel.svg
[npm-url]: https://npmjs.org/package/call-parallel
[downloads-image]: https://img.shields.io/npm/dm/call-parallel.svg
[downloads-url]: https://npmjs.org/package/call-parallel

#### Call an array of functions in parallel

### usage

#### parallel(tasks)

Run the `tasks` array of functions in parallel, without waiting until the previous
function has completed. If any of the functions pass an error to its callback, the main
is immediately fulfilled with the value of the error. Once the `tasks` have
completed, the results are passed to the result array.

It is also possible to use an object instead of an array. Each property will be run as a
function and the results will be passed to the final object instead of
an array. This can be a more readable way of handling the results.

##### arguments

- `tasks` - An array or object containing functions to run. Each function is passed a
`callback(err, result)` which it must call on completion with an error `err` (which can
be `null`) and an optional `result` value.

#### return
Promise, which will be fulfilled, when all the functions have completed. It's gets
an object with err property and results array (or object) containing all the result
arguments passed to the task callbacks.

##### example

```js
'use strict';

const parallel = require('call-parallel');

(async() => {
  // the results array will equal ['one','two'] even though
  // the second function had a shorter timeout
  console.log(await parallel([
    callback => setTimeout(() => callback(null, 'one'), 500),
    callback => setTimeout(() => callback(null, 'two'), 100)
  ]));
})();
```

This module is basically equivalent to
[`run-parallel`](https://github.com/feross/run-paralle), but it's not support `async/await`.

### see also

- [run-auto](https://github.com/feross/run-auto)
- [run-parallel-limit](https://github.com/feross/run-parallel-limit)
- [run-series](https://github.com/feross/run-series)
- [run-waterfall](https://github.com/feross/run-waterfall)

### license

MIT. Copyright (c) Anton Kenikh.
