var gulp = require('gulp');
var config = require('laravel-elixir').config;
var plugins = require('gulp-load-plugins')();

/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

gulp.task('scripts', function() {
    return gulp.src(config.concatenate.js.src)
        .pipe(plugins.concat(config.concatenate.js.concatName))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.concatenate.js.to));
});
