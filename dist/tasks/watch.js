'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var batch = _laravelElixir2.default.Plugins.batch;

/*
 |----------------------------------------------------------------
 | Watcher
 |----------------------------------------------------------------
 |
 | When you want to keep an eye on your files for changes, and
 | then re-trigger Gulp, then you should use the gulp watch
 | command. This way, you can auto-compile on each save!
 |
 */

_gulp2.default.task('watch', function () {
    initBrowserify();

    _laravelElixir2.default.tasks.forEach(function (task) {
        var batchOptions = _laravelElixir2.default.config.batchOptions;

        if (task.hasWatchers()) {
            _gulp2.default.watch(task.watchers, { interval: 1000 }, batch(batchOptions, function (events) {
                events.on('end', _gulp2.default.start(task.name));
            }));
        }
    });
});

/**
 * Determine if Browserify is included in the list.
 */
var initBrowserify = function initBrowserify() {
    if (_laravelElixir2.default.tasks.has('browserify')) {
        _laravelElixir2.default.config.js.browserify.watchify.enabled = true;

        _gulp2.default.start('browserify');
    }
};