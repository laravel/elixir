var gulp = require('gulp');
var Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;


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
