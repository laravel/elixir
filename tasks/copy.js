var gulp = require('gulp');
var Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;


/*
 |----------------------------------------------------------------
 | Copying
 |----------------------------------------------------------------
 |
 | This task offers a simple way to copy files from one place to
 | another. That's it. Not any more complicated than that!
 |
 */

Elixir.extend('copy', function(src, output) {
    var paths = new Elixir.GulpPaths().src(src).output(output);

    new Elixir.Task('copy', function() {
        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.if(! paths.output.isDir, $.rename(paths.output.name)))
            .pipe(gulp.dest(paths.output.baseDir))
        );
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});
