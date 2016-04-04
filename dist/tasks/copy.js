'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _laravelElixir2.default.Plugins;

/*
 |----------------------------------------------------------------
 | Copying
 |----------------------------------------------------------------
 |
 | This task offers a simple way to copy files from one place to
 | another. No more complicated than that! You may either set
 | a single file or alternatively you can copy a full dir.
 |
 */

_laravelElixir2.default.extend('copy', function (src, output) {
    var paths = new _laravelElixir2.default.GulpPaths().src(src).output(output);

    new _laravelElixir2.default.Task('copy', function () {
        this.log(paths.src, paths.output);

        return _gulp2.default.src(paths.src.path, { dot: true }).pipe($.if(!paths.output.isDir, $.rename(paths.output.name))).pipe(_gulp2.default.dest(paths.output.baseDir));
    }).watch(paths.src.path).ignore(paths.output.path);
});