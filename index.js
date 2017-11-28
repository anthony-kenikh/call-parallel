'use strict';

exports = module.exports = function (tasks) {
  let results, pending, keys;

  if (Array.isArray(tasks)) {
    results = [];
    pending = tasks.length;
  } else {
    keys = Object.keys(tasks);
    results = {};
    pending = keys.length;
  }

  return new Promise(resolve => {
    function done(err) {
      process.nextTick(() => resolve({ err, results }))
    }

    function each(i, err, result) {
      results[i] = result;
      (--pending === 0 || err) && done(err);
    }

    if (!pending) {
      // empty
      done(null)
    } else if (keys) {
      // object
      keys.forEach(key => tasks[key]((err, result) => each(key, err, result)));
    } else {
      // array
      tasks.forEach((task, i) => task((err, result) => each(i, err, result)));
    }
  });
};
