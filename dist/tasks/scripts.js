'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _laravelElixir2.default.Plugins;
var config = _laravelElixir2.default.config;

/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

_laravelElixir2.default.extend('scripts', function (scripts, output, baseDir) {
    var paths = prepGulpPaths(scripts, baseDir, output);

    new _laravelElixir2.default.Task('scripts', function () {
        return gulpTask.call(this, paths);
    }).watch(paths.src.path).ignore(paths.output.path);
});

_laravelElixir2.default.extend('scriptsIn', function (baseDir, output) {
    var paths = prepGulpPaths('**/*.js', baseDir, output);

    new _laravelElixir2.default.Task('scriptsIn', function () {
        return gulpTask.call(this, paths);
    }).watch(paths.src.path).ignore(paths.output.path);
});

_laravelElixir2.default.extend('babel', function (scripts, output, baseDir, options) {
    var paths = prepGulpPaths(scripts, baseDir, output);

    new _laravelElixir2.default.Task('babel', function () {
        var babelOptions = options || config.js.babel.options;

        return gulpTask.call(this, paths, babelOptions);
    }).watch(paths.src.path).ignore(paths.output.path);
});

/**
 * Trigger the Gulp task logic.
 *
 * @param {GulpPaths}   paths
 * @param {object|null} babel
 */
var gulpTask = function gulpTask(paths, babel) {
    this.log(paths.src, paths.output);

    return _gulp2.default.src(paths.src.path).pipe($.if(config.sourcemaps, $.sourcemaps.init())).pipe($.concat(paths.output.name)).pipe($.if(babel, $.babel(babel))).on('error', function (e) {
        new _laravelElixir2.default.Notification().error(e, 'Babel Compilation Failed!');
        this.emit('end');
    }).pipe($.if(config.production, $.uglify(config.js.uglify.options))).pipe($.if(config.sourcemaps, $.sourcemaps.write('.'))).pipe(_gulp2.default.dest(paths.output.baseDir)).pipe(new _laravelElixir2.default.Notification('Scripts Merged!'));
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
    return new _laravelElixir2.default.GulpPaths().src(src, baseDir || config.get('assets.js.folder')).output(output || config.get('public.js.outputFolder'), 'all.js');
};