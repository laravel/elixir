'use strict';

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

var _Css = require('./shared/Css');

var _Css2 = _interopRequireDefault(_Css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _laravelElixir2.default.config;

/*
 |----------------------------------------------------------------
 | Less Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Less, including minification and
 | and auto-prefixing. Less is one of the CSS pre-processors
 | supported by Elixir, along with the Sass CSS processor.
 |
 */

_laravelElixir2.default.extend('less', function (src, output, options) {
    var paths = prepGulpPaths(src, output);

    new _laravelElixir2.default.Task('less', function () {
        return (0, _Css2.default)({
            name: 'Less',
            compiler: require('gulp-less'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.less.pluginOptions
        });
    }).watch(paths.src.baseDir + '/**/*.less').ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function prepGulpPaths(src, output) {
    return new _laravelElixir2.default.GulpPaths().src(src, config.get('assets.css.less.folder')).output(output || config.get('public.css.outputFolder'), 'app.css');
};