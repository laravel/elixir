var gulp    = require('gulp');
var compile = require('./shared/Css');
var Elixir = require('laravel-elixir');

var config = Elixir.config;

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

Elixir.extend('less', function(src, output, options) {
    var paths = prepGulpPaths(src, output);

    new Elixir.Task('less', function() {
        return compile({
            name: 'Less',
            compiler: require('gulp-less'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.less.pluginOptions
        });
    })
    .watch(paths.src.baseDir + '/**/*.less')
    .ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.css.less.folder'))
        .output(output || config.get('public.css.outputFolder'), 'app.css');
};
