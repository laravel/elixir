var gulp = require('gulp');
var elixir = require('laravel-elixir');

/*
 |----------------------------------------------------------------
 | Copy Files
 |----------------------------------------------------------------
 |
 | Sometimes, you need to copy any number of files from one
 | directory to another. This task will give you a simple
 | way to do that. It's a breeze. Gosh, 3 chars is hard. I give up.
 |
 */

elixir.extend('copy', function(src, output) {

    var config = this;
    var stream;

    gulp.task('copy', function() {
        config.duplicate.forEach(function(copy) {
            stream = gulp.src(copy.src).pipe(gulp.dest(copy.output));
        });

        return stream;
    });

    config.duplicate.push({
        src: src,
        output: output
    });

    return config.queueTask('copy');

});