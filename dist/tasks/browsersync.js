'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _laravelElixir2.default.config;

var _ = void 0;
var gutils = void 0;
var browserSync = void 0;

/*
 |----------------------------------------------------------------
 | BrowserSync
 |----------------------------------------------------------------
 |
 | Browsersync makes your browser testing workflow faster by
 | synchronizing URLs, behavior, and code changes across
 | across multiple devices. And, now it's in Elixir!
 |
 */

_laravelElixir2.default.extend('browserSync', function (options) {
    loadPlugins();

    options = _.extend({
        files: [config.appPath + '/**/*.php', config.get('public.css.outputFolder') + '/**/*.css', config.get('public.js.outputFolder') + '/**/*.js', config.get('public.versioning.buildFolder') + '/rev-manifest.json', config.viewPath + '/**/*.php'],
        watchOptions: {
            usePolling: true
        },
        snippetOptions: {
            rule: {
                match: /(<\/body>|<\/pre>)/i,
                fn: function fn(snippet, match) {
                    return snippet + match;
                }
            }
        }
    }, config.browserSync, options);

    // Browsersync will only run during `gulp watch`.
    if (gutils.env._.indexOf('watch') > -1) {
        browserSync.init(options);
    }

    new _laravelElixir2.default.Task('browserSync', function () {}).watch();
});

/**
 * Load the required Gulp plugins on demand.
 */
var loadPlugins = function loadPlugins() {
    _ = require('underscore');
    gutils = require('gulp-util');
    browserSync = require('browser-sync').create();
};