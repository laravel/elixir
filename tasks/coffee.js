var gulp   = require('gulp');
var Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;
var config = Elixir.config;

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

Elixir.extend('coffee', function(src, output, options) {
    var paths = prepGulpPaths(src, output);

    new Elixir.Task('coffee', function() {
        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
            .pipe($.coffee(options || config.js.coffee.options)
                .on('error', function(e) {
                    new Elixir.Notification().error(e, 'CoffeeScript Compilation Failed!');

                    this.emit('end');
                }))
            .pipe($.concat(paths.output.name))
            .pipe($.if(config.production, $.uglify()))
            .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification('CoffeeScript Compiled!'))
        );
    })
    .watch(paths.src.path)
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
        .src(src, config.get('assets.js.coffee.folder'))
        .output(output || config.get('public.js.outputFolder'), 'app.js');
};
