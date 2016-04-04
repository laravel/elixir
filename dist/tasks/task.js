'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 |----------------------------------------------------------------
 | Custom Gulp Tasks
 |----------------------------------------------------------------
 |
 | Sometimes, you'll want to hook your custom Gulp tasks into
 | Elixir. Simple! Simply call Elixir's task() method, and
 | provide the name of your task, and a regex to watch.
 |
 */

_laravelElixir2.default.extend('task', function (name, watcher) {
    var task = new _laravelElixir2.default.Task('task', function () {
        return _gulp2.default.start(name);
    });

    if (watcher) {
        task.watch(watcher);
    }
});