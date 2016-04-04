'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _laravelElixir2.default.Plugins;

/*
 |----------------------------------------------------------------
 | File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate an array of files. Nothing more
 | nothing less. Note that, while, say, mix.scripts() runs
 | general compilation on the files, this one does not.
 |
 */

_laravelElixir2.default.extend('combine', function (src, output, baseDir) {
    var paths = prepGulpPaths(src, baseDir, output);

    new _laravelElixir2.default.Task('combine', function () {
        this.log(paths.src, paths.output);

        return _gulp2.default.src(paths.src.path).pipe($.concat(paths.output.name)).pipe(_gulp2.default.dest(paths.output.baseDir));
    }).watch(paths.src.path).ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string}       baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function prepGulpPaths(src, baseDir, output) {
    return new _laravelElixir2.default.GulpPaths().src(src, baseDir || '').output(output);
};