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
 | CoffeeScript Compilation
 |----------------------------------------------------------------
 |
 | This task will compile your CoffeeScript, minify it, and then
 | optionally generate a "manifest" file that helps with your
 | browser cache-busting of previous versions of your code.
 |
 */

_laravelElixir2.default.extend('coffee', function (src, output, options) {
    var paths = prepGulpPaths(src, output);

    new _laravelElixir2.default.Task('coffee', function () {
        this.log(paths.src, paths.output);

        return _gulp2.default.src(paths.src.path).pipe($.if(config.sourcemaps, $.sourcemaps.init())).pipe($.coffee(options || config.js.coffee.options).on('error', function (e) {
            new _laravelElixir2.default.Notification().error(e, 'CoffeeScript Compilation Failed!');

            this.emit('end');
        })).pipe($.concat(paths.output.name)).pipe($.if(config.production, $.uglify(config.js.uglify.options))).pipe($.if(config.sourcemaps, $.sourcemaps.write('.'))).pipe(_gulp2.default.dest(paths.output.baseDir)).pipe(new _laravelElixir2.default.Notification('CoffeeScript Compiled!'));
    }).watch(paths.src.path).ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function prepGulpPaths(src, output) {
    return new _laravelElixir2.default.GulpPaths().src(src, config.get('assets.js.coffee.folder')).output(output || config.get('public.js.outputFolder'), 'app.js');
};