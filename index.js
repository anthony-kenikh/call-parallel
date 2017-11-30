'use strict';

exports = module.exports = function (tasks, limit = 0) {
  let results, required, pending, keys, next = limit;

  if (Array.isArray(tasks)) {
    results = [];
    pending = required = tasks.length;
  } else {
    keys = Object.keys(tasks);
    results = {};
    pending = required = keys.length;
  }

  return new Promise(resolve => {
    function done(err) {
      process.nextTick(() => resolve({ err, results }))
    }

    function each(i, err, result) {
      results[i] = result;

      if (--pending === 0 || err) {
        done(err);
      } else if (limit && !err && next < required) {
        let key = keys ? keys[next] : next;
        next+= 1;
        tasks[key]((err, result) => each(key, err, result));
      }
    }

    if (!pending) {
      // empty
      done(null)
    } else if (keys) {
      // object
      keys.some((key, i) => {
        tasks[key]((err, result) => each(key, err, result));
        return i === limit - 1; // early return
      });
    } else {
      // array
      tasks.some((task, i) => {
        task((err, result) => each(i, err, result));
        return i === limit - 1;
      });
    }
  });
};
