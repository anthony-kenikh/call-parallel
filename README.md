# call-parallel [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url]

[travis-image]: https://travis-ci.org/anthony-kenikh/call-parallel.svg
[travis-url]: https://travis-ci.org/anthony-kenikh/call-parallel
[npm-image]: https://img.shields.io/npm/v/call-parallel.svg
[npm-url]: https://npmjs.org/package/call-parallel
[downloads-image]: https://img.shields.io/npm/dm/call-parallel.svg
[downloads-url]: https://npmjs.org/package/call-parallel

#### Call an array of functions in parallel (allow set the limit number of tasks executing at the same time)

ES6 and `async/await` syntax support (Node 7.6.0+).

### Usage

#### parallel(tasks)

Run the `tasks` array of functions in parallel with a maximum of `limit` tasks executing
at the same time (if passed), without waiting until the previous function has completed.
If any of the functions pass an error to it's callback, the main is immediately fulfilled
with the value of the error. Once the `tasks` have completed, the results are passed to
the result array.

Note that the tasks are not executed in batches, so there is no guarantee that the first
limit tasks will complete before any others are started.

It is also possible to use an object instead of an array. Each property will be run as a
function and the results will be passed to the final object instead of
an array. This can be a more readable way of handling the results.

##### Arguments

- `tasks` - An array or object containing functions to run. Each function is passed a
`callback(err, result)` which it must call on completion with an error `err` (which can
be `null`) and an optional `result` value.
- `limit` - The maximum number of `tasks` to run at any time. Default `0` – no limit.

#### Return
Promise, which will be fulfilled, when all the functions have completed. It's gets
an object with err property and results array (or object) containing all the result
arguments passed to the task callbacks.

##### Example

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
[`run-parallel`](https://github.com/feross/run-parallel), but it's not support `async/await`.

### See also

- [run-auto](https://github.com/feross/run-auto)
- [run-parallel-limit](https://github.com/feross/run-parallel-limit)
- [run-series](https://github.com/feross/run-series)
- [run-waterfall](https://github.com/feross/run-waterfall)

### License

MIT. Copyright (c) Anton Kenikh.
