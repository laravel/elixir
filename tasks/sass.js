var gulp    = require('gulp');
var compile = require('./shared/Css');
var Elixir = require('laravel-elixir');

var config = Elixir.config;


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

var gulpTask = function(src, output, options) {
    new Elixir.Task('sass', function() {
        var paths = prepGulpPaths(src, output);

        return compile({
            name: 'Sass',
            compiler: require('gulp-sass'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.sass.pluginOptions
        });
    })
    .watch(config.get('assets.css.sass.folder') + '/**/*.+(sass|scss)');
};


Elixir.extend('sass', function() {
    gulpTask.apply(this, arguments);
});


// Deprecated. Only for backward compatibility.
Elixir.extend('rubySass', function() {
    gulpTask.apply(this, arguments);
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.css.sass.folder'))
        .output(output || config.get('public.css.outputFolder'), 'app.css');
};
