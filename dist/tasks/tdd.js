'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 |----------------------------------------------------------------
 | TDD Watcher
 |----------------------------------------------------------------
 |
 | This task will keep an eye on any tasks that are part of the
 | tdd category. By default this includes PHPUnit and PHPSpec
 | tests. Run `gulp tdd` and your tests will auto-trigger.
 |
 */

_gulp2.default.task('tdd', function () {
  new _laravelElixir2.default.Log.message('Watching for tests...');

  _laravelElixir2.default.tasks.filter(function (task) {
    return task.category == 'tdd';
  }).forEach(function (task) {
    return _gulp2.default.watch(task.watchers, [task.name]);
  });
});