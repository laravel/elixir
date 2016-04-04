'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 |----------------------------------------------------------------
 | Shell Commands
 |----------------------------------------------------------------
 |
 | Need to execute a shell script, as part of your compile
 | process? No problem. Elixir can help with that. Just
 | call `mix.exec('command')`, and, bam, you're set!
 |
 */

_laravelElixir2.default.extend('exec', function (command, watcher) {
    var task = new _laravelElixir2.default.Task('exec', function () {
        _laravelElixir2.default.Log.heading('Triggering Command...').message(command);

        return _gulp2.default.src('').pipe(_laravelElixir2.default.Plugins.shell(command));
    });

    if (watcher) {
        task.watch(watcher);
    }
});