var gulp = require('gulp');
var elixir = require('laravel-elixir');
var config = elixir.config;
var plugins = require('gulp-load-plugins')();

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

elixir.extend('styles', function(styles, baseDir, output) {

    gulp.task('styles', function() {
        return gulp.src(config.concatenate.css.src)
            .pipe(plugins.concat(config.concatenate.css.concatName))
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest(config.concatenate.css.to));
    });

    return this.combine('css', styles, baseDir, output, 'styles');

});
