'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _laravelElixir2.default.Plugins;
var config = _laravelElixir2.default.config;
var gutil = void 0;
var buffer = void 0;
var source = void 0;
var browserify = void 0;
var watchify = void 0;
var bundle = void 0;

/*
 |----------------------------------------------------------------
 | Browserify Task
 |----------------------------------------------------------------
 |
 | This task will manage your entire Browserify workflow, from
 | scratch! Also, it will channel all files through Babelify
 | so that you may use all the ES6 goodness you can stand.
 |
 */

_laravelElixir2.default.extend('browserify', function (src, output, baseDir, options) {
    var paths = prepGulpPaths(src, baseDir, output);

    loadPlugins();

    new _laravelElixir2.default.Task('browserify', function () {
        var stream = config.js.browserify.watchify.enabled ? watchifyStream : browserifyStream;

        bundle = function (stream, paths) {
            this.log(paths.src, paths.output);

            return stream.bundle().on('error', function (e) {
                new _laravelElixir2.default.Notification().error(e, 'Browserify Failed!');

                this.emit('end');
            }).pipe(source(paths.output.name)).pipe(buffer()).pipe($.if(config.sourcemaps, $.sourcemaps.init({ loadMaps: true }))).pipe($.if(config.production, $.uglify(config.js.uglify.options))).pipe($.if(config.sourcemaps, $.sourcemaps.write('.'))).pipe(_gulp2.default.dest(paths.output.baseDir)).pipe(new _laravelElixir2.default.Notification('Browserify Compiled!'));
        }.bind(this);

        return bundle(stream({
            paths: paths,
            options: options || config.js.browserify.options
        }), paths);
    })
    // We'll add this task to be watched, but Watchify
    // will handle the process, to speed things up.
    .watch();
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function prepGulpPaths(src, baseDir, output) {
    return new _laravelElixir2.default.GulpPaths().src(src, baseDir || config.get('assets.js.folder')).output(output || config.get('public.js.outputFolder'), 'bundle.js');
};

/**
 * Get a standard Browserify stream.
 *
 * @param {object} data
 */
var browserifyStream = function browserifyStream(data) {
    var stream = browserify(data.paths.src.path, data.options);

    config.js.browserify.transformers.forEach(function (transformer) {
        stream.transform(require(transformer.name), transformer.options || {});
    });

    config.js.browserify.plugins.forEach(function (plugin) {
        stream.plugin(require(plugin.name), plugin.options || {});
    });

    config.js.browserify.externals.forEach(function (external) {
        stream.external(external);
    });

    return stream;
};

/**
 * Get a Browserify stream, wrapped in Watchify.
 *
 * @param {object} data
 */
var watchifyStream = function watchifyStream(data) {
    var browserify = watchify(browserifyStream(data), config.js.browserify.watchify.options);

    browserify.on('log', gutil.log);
    browserify.on('update', function () {
        return bundle(browserify, data.paths);
    });

    return browserify;
};

/**
 * Load the required Gulp plugins on demand.
 */
var loadPlugins = function loadPlugins() {
    browserify = require('browserify');
    watchify = require('watchify');
    gutil = require('gulp-util');
    buffer = require('vinyl-buffer');
    source = require('vinyl-source-stream');
};