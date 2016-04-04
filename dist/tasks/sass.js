'use strict';

var _Css = require('./shared/Css');

var _Css2 = _interopRequireDefault(_Css);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _laravelElixir2.default.config;

/*
 |----------------------------------------------------------------
 | Sass Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Sass, including minification and
 | and auto-prefixing. Sass is one of the CSS pre-precessors
 | supported by Elixir, along with the Less CSS processor.
 |
 */

var gulpTask = function gulpTask(src, output, options) {
    var paths = prepGulpPaths(src, output);

    new _laravelElixir2.default.Task('sass', function () {
        return (0, _Css2.default)({
            name: 'Sass',
            compiler: require('gulp-sass'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.sass.pluginOptions
        });
    }).watch(paths.src.baseDir + '/**/*.+(sass|scss)').ignore(paths.output.path);
};

_laravelElixir2.default.extend('sass', function () {
    gulpTask.apply(this, arguments);
});

// Deprecated. Only for backward compatibility.
_laravelElixir2.default.extend('rubySass', function () {
    gulpTask.apply(this, arguments);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function prepGulpPaths(src, output) {
    return new _laravelElixir2.default.GulpPaths().src(src, config.get('assets.css.sass.folder')).output(output || config.get('public.css.outputFolder'), 'app.css');
};