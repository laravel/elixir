var gulp = require('gulp');
var Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;
var config = Elixir.config;


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

Elixir.extend('styles', function(styles, output, baseDir) {
    var paths = prepGulpPaths(styles, baseDir, output);

    new Elixir.Task('styles', function() {
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


Elixir.extend('stylesIn', function(baseDir, output) {
    var paths = prepGulpPaths('**/*.css', baseDir, output);

    new Elixir.Task('stylesIn', function() {
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


/**
 * Trigger the Gulp task logic.
 *
 * @param {object} paths
 */
var gulpTask = function(paths) {
    this.log(paths.src, paths.output);

    return (
        gulp
        .src(paths.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe($.concatCss(paths.output.name, {rebaseUrls: false, inlineImports: false}))
        .pipe($.if(config.production, $.minifyCss(config.css.minifyCss.pluginOptions)))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(gulp.dest(paths.output.baseDir))
        .pipe(new Elixir.Notification('Stylesheets Merged!'))
    );
};


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir || config.get('assets.css.folder'))
        .output(output || config.get('public.css.outputFolder'), 'all.css');
};
