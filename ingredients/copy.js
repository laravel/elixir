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

    gulp.task('copy', function() {
        return gulp.src(src).pipe(gulp.dest(output));
    });

    return this.queueTask('copy');

});