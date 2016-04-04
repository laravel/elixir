'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _laravelElixir2.default.Plugins;
var config = _laravelElixir2.default.config;

var CleanCSS = void 0;
var map = void 0;

/*
 |----------------------------------------------------------------
 | CSS File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your style sheet files
 | in order, which provides a quick and simple way to reduce
 | the number of HTTP requests your application fires off.
 |
 */

_laravelElixir2.default.extend('styles', function (styles, output, baseDir) {
    var paths = prepGulpPaths(styles, baseDir, output);

    loadPlugins();

    new _laravelElixir2.default.Task('styles', function () {
        return gulpTask.call(this, paths);
    }).watch(paths.src.path).ignore(paths.output.path);
});

_laravelElixir2.default.extend('stylesIn', function (baseDir, output) {
    var paths = prepGulpPaths('**/*.css', baseDir, output);

    new _laravelElixir2.default.Task('stylesIn', function () {
        return gulpTask.call(this, paths);
    }).watch(paths.src.path).ignore(paths.output.path);
});

/**
 * Trigger the Gulp task logic.
 *
 * @param {GulpPaths} paths
 */
var gulpTask = function gulpTask(paths) {
    this.log(paths.src, paths.output);

    return _gulp2.default.src(paths.src.path).pipe($.if(config.sourcemaps, $.sourcemaps.init())).pipe($.concat(paths.output.name)).pipe($.if(config.production, minify())).pipe($.if(config.sourcemaps, $.sourcemaps.write('.'))).pipe(_gulp2.default.dest(paths.output.baseDir)).pipe(new _laravelElixir2.default.Notification('Stylesheets Merged!'));
};

/**
 * Prepare the minifier instance.
 */
var minify = function minify() {
    return map(function (buff, filename) {
        return new CleanCSS(config.css.minifier.pluginOptions).minify(buff.toString()).styles;
    });
};

/**
 * Load the required Gulp plugins on demand.
 */
var loadPlugins = function loadPlugins() {
    CleanCSS = require('clean-css');
    map = require('vinyl-map');
};

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function prepGulpPaths(src, baseDir, output) {
    return new _laravelElixir2.default.GulpPaths().src(src, baseDir || config.get('assets.css.folder')).output(output || config.get('public.css.outputFolder'), 'all.css');
};